"""パッケージ内のメソッド・関数の呼び出し関係（静的）を抽出する。

型注釈・簡単な代入追跡・戻り値の推論で、self 以外のオブジェクト経由の呼び出しも解決する。

使い方: python3 analysis/call_graph.py tinydb/tinydb [--json out.json]

辺の種類 (kind):
  self      self.m() / self.prop（自クラスまたは親クラス）
  super     super().m()
  typed     型がわかっている変数・フィールド経由の呼び出し
  ctor      クラスの生成 X(...) → X.__init__
  func      モジュール関数の呼び出し
  implicit  演算子・組み込み関数・構文が暗黙に呼ぶ特殊メソッド（==, &, len(), for, with, [] など）
  delegate  __getattr__ による委譲の先（TinyDB → Table など）
  field-read / field-write  self 以外のオブジェクトのフィールド・クラス変数の読み書き
"""
import ast
import json
import pathlib
import sys

FUNC = (ast.FunctionDef, ast.AsyncFunctionDef)

BINOPS = {ast.BitAnd: "__and__", ast.BitOr: "__or__", ast.Add: "__add__", ast.Sub: "__sub__"}
CMPOPS = {ast.Eq: "__eq__", ast.NotEq: "__ne__", ast.Lt: "__lt__", ast.LtE: "__le__",
          ast.Gt: "__gt__", ast.GtE: "__ge__"}
UNOPS = {ast.Invert: "__invert__"}
BUILTINS = {"len": "__len__", "iter": "__iter__", "repr": "__repr__", "hash": "__hash__", "str": "__repr__"}


class Pkg:
    def __init__(self, root):
        self.root = root
        self.mods = {p.stem: ast.parse(p.read_text()) for p in sorted(root.glob("*.py"))}
        self.classes = {}   # name -> {"mod", "node", "bases", "methods", "props", "classvars", "fields"}
        self.funcs = {}     # (mod, name) -> node
        self.imports = {}   # mod -> {local name: imported name}
        self._ret_cache = {}
        for mod, tree in self.mods.items():
            imp = self.imports.setdefault(mod, {})
            for n in tree.body:
                if isinstance(n, ast.ClassDef):
                    methods = {m.name: m for m in n.body if isinstance(m, FUNC)}
                    props = {k for k, m in methods.items()
                             if any(isinstance(d, ast.Name) and d.id == "property" for d in m.decorator_list)}
                    cv = {}
                    for s in n.body:
                        if isinstance(s, ast.Assign) and isinstance(s.targets[0], ast.Name):
                            cv[s.targets[0].id] = s.value
                    self.classes[n.name] = dict(mod=mod, node=n, bases=[ast.unparse(b) for b in n.bases],
                                                methods=methods, props=props, classvars=cv, fields={})
                elif isinstance(n, FUNC):
                    self.funcs[(mod, n.name)] = n
                elif isinstance(n, ast.ImportFrom) and (n.level or (n.module or "").startswith(root.name)):
                    for a in n.names:
                        imp[a.asname or a.name] = a.name
        self._infer_fields()

    def add_external_module(self, name, tree):
        """テストなどパッケージ外のモジュールの import を登録し、名前解決できるようにする。"""
        imp = self.imports.setdefault(name, {})
        for n in ast.walk(tree):
            if isinstance(n, ast.ImportFrom) and (n.module or "").split(".")[0] == self.root.name:
                for a in n.names:
                    imp[a.asname or a.name] = a.name

    # ---- 型の表現: ("inst", Class) / ("cls", Class) / None ----
    def ann_type(self, ann):
        if ann is None:
            return None
        if isinstance(ann, ast.Constant) and isinstance(ann.value, str):
            ann = ast.parse(ann.value, mode="eval").body
        if isinstance(ann, ast.Name):
            return ("inst", ann.id) if ann.id in self.classes else None
        if isinstance(ann, ast.Subscript):
            head = ast.unparse(ann.value)
            args = ann.slice.elts if isinstance(ann.slice, ast.Tuple) else [ann.slice]
            if head == "type":
                t = self.ann_type(args[0])
                return ("cls", t[1]) if t else None
            if head in ("Optional", "Union"):
                for a in args:
                    if (t := self.ann_type(a)):
                        return t
        return None

    def mro(self, cls):
        out, todo = [], [cls]
        while todo:
            c = todo.pop(0)
            if c in self.classes and c not in out:
                out.append(c)
                todo += self.classes[c]["bases"]
        return out

    def lookup(self, cls, name):
        """属性 name をクラス cls の MRO で探し、(定義しているクラス, 種類) を返す。"""
        for c in self.mro(cls):
            info = self.classes[c]
            if name in info["methods"]:
                return c, "method"
            if name in info["classvars"]:
                return c, "classvar"
            if name in info["fields"]:
                return c, "field"
        return None, None

    def ret_type(self, cls, mname):
        """メソッドの戻り値の型。注釈がなければ return 文から推論する。"""
        key = (cls, mname)
        if key in self._ret_cache:
            return self._ret_cache[key]
        self._ret_cache[key] = None  # 再帰ガード
        m = self.classes[cls]["methods"][mname]
        t = self.ann_type(m.returns)
        if t is None and m.returns is None:
            w = FuncWalker(self, self.classes[cls]["mod"], cls, m)
            w.collect_env()
            for n in ast.walk(m):
                if isinstance(n, ast.Return) and n.value is not None and (t := w.infer(n.value)):
                    break
        self._ret_cache[key] = t
        return t

    def getattr_delegate(self, cls):
        """__getattr__ が `return getattr(<式>, name)` なら、その式を返す（委譲先）。"""
        c, k = self.lookup(cls, "__getattr__")
        if k != "method":
            return None, None
        m = self.classes[c]["methods"]["__getattr__"]
        for n in ast.walk(m):
            if isinstance(n, ast.Return) and isinstance(n.value, ast.Call) \
                    and isinstance(n.value.func, ast.Name) and n.value.func.id == "getattr":
                return c, n.value.args[0]
        return c, None

    def attr_type(self, cls, name):
        c, k = self.lookup(cls, name)
        if k == "method":
            return self.ret_type(c, name) if name in self.classes[c]["props"] else None
        if k == "classvar":
            v = self.classes[c]["classvars"][name]
            return ("cls", v.id) if isinstance(v, ast.Name) and v.id in self.classes else None
        if k == "field":
            return self.classes[c]["fields"][name]
        return None

    def resolve_name(self, mod, name):
        imp = self.imports.get(mod, {})
        local = mod in self.mods
        target = imp.get(name, name if local else None)
        if target is None:
            return None
        if target in self.classes and (not local or self.classes[target]["mod"] == mod or name in imp):
            return ("class", target)
        if local and (mod, name) in self.funcs:
            return ("func", f"{mod}.{name}")
        if name in imp:
            for (m, f) in self.funcs:
                if f == target:
                    return ("func", f"{m}.{f}")
        return None

    def _infer_fields(self):
        for info in self.classes.values():
            for m in info["methods"].values():
                for n in ast.walk(m):
                    if isinstance(n, ast.Attribute) and isinstance(n.value, ast.Name) \
                            and n.value.id == "self" and isinstance(n.ctx, ast.Store):
                        info["fields"].setdefault(n.attr, None)
        for _ in range(3):  # フィールドの型どうしが依存するので数回回す
            self._ret_cache.clear()
            for name, info in self.classes.items():
                for m in info["methods"].values():
                    w = FuncWalker(self, info["mod"], name, m)
                    w.collect_env()
                    for k, v in w.field_types.items():
                        if v and info["fields"].get(k) is None:
                            info["fields"][k] = v
        self._ret_cache.clear()


def method_id(pkg, cls, name):
    return f"{pkg.classes[cls]['mod']}.{cls}.{name}"


class FuncWalker:
    """1つの関数本体を歩き、ローカル変数の型を追いながら呼び出し先を集める。"""

    def __init__(self, pkg, mod, cls, fn, env=None):
        self.pkg, self.mod, self.cls, self.fn = pkg, mod, cls, fn
        self.env = dict(env or {})
        args = fn.args.posonlyargs + fn.args.args + fn.args.kwonlyargs
        for i, a in enumerate(args):
            if cls and i == 0 and a.arg == "self":
                self.env["self"] = ("inst", cls)
            elif (t := pkg.ann_type(a.annotation)):
                self.env[a.arg] = t
        self.edges = []
        self.field_types = {}

    # ---- 型推論 ----
    def infer(self, e):
        p = self.pkg
        if isinstance(e, ast.Name):
            if e.id in self.env:
                return self.env[e.id]
            r = p.resolve_name(self.mod, e.id)
            return ("cls", r[1]) if r and r[0] == "class" else None
        if isinstance(e, ast.Attribute):
            t = self.infer(e.value)
            if not (t and t[0] == "inst"):
                return None
            c, k = p.lookup(t[1], e.attr)
            if k:
                return p.attr_type(t[1], e.attr)
            dc, dexpr = p.getattr_delegate(t[1])
            if dc and dexpr is not None:
                inner = FuncWalker(p, p.classes[dc]["mod"], dc, p.classes[dc]["methods"]["__getattr__"])
                dt = inner.infer(dexpr)
                if dt and dt[0] == "inst":
                    return p.attr_type(dt[1], e.attr)
            elif dc:
                return p.ret_type(dc, "__getattr__")
            return None
        if isinstance(e, ast.Subscript):
            # self.__dict__['x'] → フィールド x
            if isinstance(e.value, ast.Attribute) and e.value.attr == "__dict__" \
                    and isinstance(e.slice, ast.Constant) and (t := self.infer(e.value.value)) and t[0] == "inst":
                return p.attr_type(t[1], e.slice.value)
            return None
        if isinstance(e, ast.Call):
            f = e.func
            # type(x)() → x と同じクラスのインスタンス
            if isinstance(f, ast.Call) and isinstance(f.func, ast.Name) and f.func.id == "type" and f.args:
                t = self.infer(f.args[0])
                return ("inst", t[1]) if t else None
            if isinstance(f, ast.Name) and f.id == "type" and e.args:
                t = self.infer(e.args[0])
                return ("cls", t[1]) if t else None
            ft = self.infer(f)
            if ft and ft[0] == "cls":
                return ("inst", ft[1])
            if ft and ft[0] == "inst":  # インスタンスの呼び出し → __call__
                c, k = p.lookup(ft[1], "__call__")
                return p.ret_type(c, "__call__") if k == "method" else None
            if isinstance(f, ast.Attribute):
                t = self.infer(f.value)
                if t and t[0] == "inst":
                    c, k = p.lookup(t[1], f.attr)
                    if k == "method":
                        return p.ret_type(c, f.attr)
            if isinstance(f, ast.Name):
                r = p.resolve_name(self.mod, f.id)
                if r and r[0] == "func":
                    m, name = r[1].rsplit(".", 1)
                    return p.ann_type(p.funcs[(m, name)].returns)
        if isinstance(e, (ast.BinOp, ast.UnaryOp, ast.Compare)):
            # 演算子オーバーロード: 左辺の特殊メソッドの戻り値
            operand = e.left if isinstance(e, (ast.BinOp, ast.Compare)) else e.operand
            op = e.op if not isinstance(e, ast.Compare) else e.ops[0]
            dunder = {**BINOPS, **CMPOPS, **UNOPS}.get(type(op))
            t = self.infer(operand)
            if dunder and t and t[0] == "inst":
                c, k = p.lookup(t[1], dunder)
                return p.ret_type(c, dunder) if k == "method" else None
        return None

    def collect_env(self):
        for n in ast.walk(self.fn):
            if isinstance(n, (ast.Assign, ast.AnnAssign)):
                tgts = n.targets if isinstance(n, ast.Assign) else [n.target]
                t = self.pkg.ann_type(n.annotation) if isinstance(n, ast.AnnAssign) else None
                t = t or (self.infer(n.value) if n.value is not None else None)
                for tg in tgts:
                    if isinstance(tg, ast.Name) and t:
                        self.env[tg.id] = t
                    elif isinstance(tg, ast.Attribute) and isinstance(tg.value, ast.Name) and tg.value.id == "self":
                        self.field_types[tg.attr] = t
            elif isinstance(n, ast.withitem) and isinstance(n.optional_vars, ast.Name):
                t = self.infer(n.context_expr)
                if t and t[0] == "inst":
                    c, k = self.pkg.lookup(t[1], "__enter__")
                    t = self.pkg.ret_type(c, "__enter__") if k == "method" else t
                if t:
                    self.env[n.optional_vars.id] = t
        return self

    # ---- 辺の収集 ----
    def add(self, target, kind, node):
        self.edges.append({"to": target, "kind": kind, "line": node.lineno})

    def add_dunder(self, expr, dunder, node):
        t = self.infer(expr)
        if t and t[0] == "inst":
            c, k = self.pkg.lookup(t[1], dunder)
            if k == "method":
                self.add(method_id(self.pkg, c, dunder), "implicit", node)

    def visit(self):
        self.collect_env()
        p = self.pkg
        for n in ast.walk(self.fn):
            if isinstance(n, ast.Call):
                f = n.func
                # super().m()
                if isinstance(f, ast.Attribute) and isinstance(f.value, ast.Call) \
                        and isinstance(f.value.func, ast.Name) and f.value.func.id == "super" and self.cls:
                    for base in p.mro(self.cls)[1:]:
                        if f.attr in p.classes[base]["methods"]:
                            self.add(method_id(p, base, f.attr), "super", n)
                            break
                    continue
                if isinstance(f, ast.Name) and f.id in BUILTINS and n.args:
                    self.add_dunder(n.args[0], BUILTINS[f.id], n)
                ft = self.infer(f)
                if ft and ft[0] == "cls":
                    c, _ = p.lookup(ft[1], "__init__")
                    if c:
                        self.add(method_id(p, c, "__init__"), "ctor", n)
                    continue
                if ft and ft[0] == "inst":
                    self.add_dunder(f, "__call__", n)
                if isinstance(f, ast.Name):
                    r = p.resolve_name(self.mod, f.id)
                    if r and r[0] == "func":
                        self.add(r[1], "func", n)
            elif isinstance(n, ast.Attribute) and isinstance(n.ctx, (ast.Load, ast.Store)):
                t = self.infer(n.value)
                if not (t and t[0] == "inst"):
                    continue
                c, k = p.lookup(t[1], n.attr)
                via_self = isinstance(n.value, ast.Name) and n.value.id == "self"
                if k in ("field", "classvar") and not via_self:
                    # 他のオブジェクトのフィールド・クラス変数の参照（self.x は field_refs.py が扱う）
                    op = "field-write" if isinstance(n.ctx, ast.Store) else "field-read"
                    self.add(f"{p.classes[c]['mod']}.{c}.{n.attr}", op, n)
                    continue
                if isinstance(n.ctx, ast.Store):
                    continue
                if k == "method":
                    kind = "self" if isinstance(n.value, ast.Name) and n.value.id == "self" else "typed"
                    self.add(method_id(p, c, n.attr), kind, n)
                elif k is None:
                    dc, dexpr = p.getattr_delegate(t[1])
                    if dc:
                        self.add(method_id(p, dc, "__getattr__"), "implicit", n)
                        if dexpr is not None:
                            inner = FuncWalker(p, p.classes[dc]["mod"], dc, p.classes[dc]["methods"]["__getattr__"])
                            dt = inner.infer(dexpr)
                            if dt and dt[0] == "inst":
                                c2, k2 = p.lookup(dt[1], n.attr)
                                if k2 == "method":
                                    self.add(method_id(p, c2, n.attr), "delegate", n)
            elif isinstance(n, (ast.BinOp, ast.UnaryOp)):
                dunder = {**BINOPS, **UNOPS}.get(type(n.op))
                if dunder:
                    self.add_dunder(n.left if isinstance(n, ast.BinOp) else n.operand, dunder, n)
            elif isinstance(n, ast.Compare):
                left = n.left
                for op, right in zip(n.ops, n.comparators):
                    if type(op) in CMPOPS:
                        self.add_dunder(left, CMPOPS[type(op)], n)
                    elif isinstance(op, (ast.In, ast.NotIn)):
                        self.add_dunder(right, "__contains__", n)
                    left = right
            elif isinstance(n, ast.Subscript):
                dunder = {ast.Load: "__getitem__", ast.Store: "__setitem__", ast.Del: "__delitem__"}[type(n.ctx)]
                self.add_dunder(n.value, dunder, n)
            elif isinstance(n, (ast.For, ast.comprehension)):
                self.add_dunder(n.iter, "__iter__", n.iter)
            elif isinstance(n, ast.withitem):
                self.add_dunder(n.context_expr, "__enter__", n.context_expr)
                self.add_dunder(n.context_expr, "__exit__", n.context_expr)
        return self


def dedupe(edges):
    seen, out = set(), []
    for e in edges:
        key = (e["to"], e["kind"])
        if key not in seen:
            seen.add(key)
            out.append(e)
    return out


def build(root):
    pkg = Pkg(root)
    units = []  # (id, mod, cls, fn)
    for name, info in pkg.classes.items():
        for m, fn in info["methods"].items():
            units.append((method_id(pkg, name, m), info["mod"], name, fn))
    for (mod, f), fn in pkg.funcs.items():
        units.append((f"{mod}.{f}", mod, None, fn))

    nodes, edges = [], []
    for uid, mod, cls, fn in units:
        nodes.append({"id": uid, "module": mod, "class": cls, "name": fn.name,
                      "lines": [fn.lineno, fn.end_lineno],
                      "property": bool(cls and fn.name in pkg.classes[cls]["props"])})
        for e in dedupe(FuncWalker(pkg, mod, cls, fn).visit().edges):
            edges.append({"from": uid, **e})

    overrides = []
    for name, info in pkg.classes.items():
        for m in info["methods"]:
            for base in pkg.mro(name)[1:]:
                if m in pkg.classes[base]["methods"]:
                    overrides.append({"method": method_id(pkg, name, m), "overrides": method_id(pkg, base, m)})
                    break
    return pkg, {"nodes": nodes, "edges": edges, "overrides": overrides}


def main():
    _, g = build(pathlib.Path(sys.argv[1]))
    if "--json" in sys.argv:
        pathlib.Path(sys.argv[sys.argv.index("--json") + 1]).write_text(
            json.dumps(g, indent=2, ensure_ascii=False))
    by_from = {}
    for e in g["edges"]:
        by_from.setdefault(e["from"], []).append(f"{e['to']} ({e['kind']})")
    for n in g["nodes"]:
        if n["id"] in by_from:
            print(n["id"])
            for t in by_from[n["id"]]:
                print("   ->", t)
    print("\n# overrides")
    for o in g["overrides"]:
        print(f"  {o['method']}  overrides  {o['overrides']}")
    kinds = {}
    for e in g["edges"]:
        kinds[e["kind"]] = kinds.get(e["kind"], 0) + 1
    print(f"\nnodes={len(g['nodes'])} edges={len(g['edges'])} {kinds}")


if __name__ == "__main__":
    main()
