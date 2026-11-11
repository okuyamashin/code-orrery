// 脆弱性アラート: 修正後（5.3.1）のモデルの上に、もともと問題のあった場所を点滅で示す。
// role: problem = 問題の箇所（赤で点滅）/ path = 攻撃の通り道（琥珀色でゆっくり脈打つ）/ fix = 修正で加わった・変わった箇所（緑で点灯）
// note は英語（画面とナレーションで使う）。
window.ALERTS = {
  id: "CVE-2020-1747",
  date: "March 2020",
  fixedIn: "5.3.1",
  title: "Arbitrary code execution in FullLoader",
  summary: "Loading an untrusted YAML document with full_load could run arbitrary code. " +
    "A python/object/new tag could put any attribute, even a method such as extend, into a new object's state, " +
    "and PyYAML then called that method itself.",
  // ツアーで警告を語るときに寄る惑星
  focus: "FullConstructor",
  // インシデント専用ツアー（INCIDENT ボタン）。ライブラリ → インシデント → 問題箇所 → 修正箇所 の順に語る。
  // kind: overview = 全景 / planet = 惑星に寄る / gate = 惑星のゲートに寄る（cls と gate を指定）
  // ナレーションは英語。読み上げのため、メソッド名はアンダースコアを空白にした読み方で書く。
  tour: [
    { kind: "overview", title: "PyYAML", sub: "the library",
      text: "PyYAML is the most widely used library for reading and writing YAML in Python. " +
        "Reading a document is a pipeline. Reader turns bytes into characters, Scanner turns them into tokens, " +
        "Parser into events, Composer into a tree of nodes, and finally a Constructor turns the nodes into Python objects. " +
        "A Loader bundles all of these stages together." },
    { kind: "planet", cls: "FullLoader", title: "FullLoader", sub: "the loader behind full_load",
      text: "This is FullLoader, the loader behind yaml dot full load. In 2020 it was also the default of yaml dot load. " +
        "It was meant to be safe enough for documents from outside: it can build some Python objects, but it should never run code." },
    { kind: "planet", cls: "FullConstructor", title: "⚠ CVE-2020-1747", sub: "March 2020 · fixed in 5.3.1",
      text: "In March 2020, CVE-2020-1747 was published. A crafted YAML document, loaded with full load, could run any code " +
        "the attacker chose, for example a shell command on the server that read it. " +
        "The flaw was in FullConstructor, the planet blinking red. This model is the fixed version, 5.3.1. " +
        "The red and amber marks show where the problem used to be." },
    { kind: "gate", cls: "FullConstructor", gate: "construct_python_object_new", title: "construct_python_object_new()", sub: "FullConstructor · attack path",
      text: "The attack starts with a tag, python slash object slash new. This gate handles that tag, " +
        "and passes everything on to construct python object apply." },
    { kind: "gate", cls: "FullConstructor", gate: "construct_python_object_apply", title: "construct_python_object_apply()", sub: "FullConstructor · attack path",
      text: "This gate does three things, in order. It creates the object. It copies the object's state from the document. " +
        "And then, if the document lists any items, it calls the object's extend method to add them." },
    { kind: "gate", cls: "FullConstructor", gate: "make_python_instance", title: "make_python_instance()", sub: "FullConstructor · attack path",
      text: "Make python instance creates the object, from a class the document names. " +
        "FullLoader only checks that the name really is a class, so many classes are allowed." },
    { kind: "gate", cls: "FullConstructor", gate: "set_python_instance_state", title: "⚠ set_python_instance_state()", sub: "FullConstructor · the problem",
      text: "And here was the problem. Set python instance state copied every name in the document's state into the new object, " +
        "without checking any of them. So the document could replace extend with a function of its own choosing. " +
        "A moment later, construct python object apply called extend, and the attacker's function ran." },
    { kind: "gate", cls: "BaseConstructor", gate: "check_state_key", title: "✓ check_state_key()", sub: "BaseConstructor · added in 5.3.1",
      text: "Now the fix. Version 5.3.1 added check state key to BaseConstructor. " +
        "It looks at one name, and if the name is forbidden, loading stops with an error." },
    { kind: "gate", cls: "FullConstructor", gate: "get_state_keys_blacklist", title: "✓ get_state_keys_blacklist()", sub: "FullConstructor · added in 5.3.1",
      text: "The forbidden names come from get state keys blacklist: extend, and every special name wrapped in double underscores. " +
        "The gate next to it turns that list into a single regular expression, built once and reused." },
    { kind: "gate", cls: "FullConstructor", gate: "set_python_instance_state", title: "✓ set_python_instance_state()", sub: "FullConstructor · changed in 5.3.1",
      text: "And the gate that was the problem now calls check state key for every name, before it sets anything. " +
        "A document that tries to replace extend is rejected before extend can ever be called." },
    { kind: "gate", cls: "UnsafeConstructor", gate: "set_python_instance_state", title: "✓ UnsafeConstructor.set_python_instance_state()", sub: "UnsafeConstructor · added in 5.3.1",
      text: "One class skips the check on purpose. UnsafeConstructor overrides the same gate, and keeps the old behaviour. " +
        "As its name says, it must never be used on documents you do not trust." },
    { kind: "overview", title: "CVE-2020-1747", sub: "summary",
      text: "So the fix was small. Two classes gained a check, and one method learned to use it. The rest of PyYAML did not change. " +
        "The story did not quite end here: a later report, CVE-2020-14343, found another way around FullLoader, and it was fixed in version 5.4." },
  ],
  classes: {
    FullConstructor: {
      role: "problem",
      note: "The constructor behind full_load. Its python/object/new tag was the way in.",
      gates: {
        set_python_instance_state: { role: "problem",
          note: "Copied the document's state into the new object without checking names. Since 5.3.1 every key is checked first." },
        construct_python_object_new: { role: "path", note: "Handles the python/object/new tag." },
        construct_python_object_apply: { role: "path",
          note: "Creates the object, sets its state, then calls instance.extend(listitems)." },
        make_python_instance: { role: "path", note: "Creates an instance of any class the document names." },
        get_state_keys_blacklist: { role: "fix", note: "Added in 5.3.1: names that may not be set, extend and __dunder__ names." },
        get_state_keys_blacklist_regexp: { role: "fix", note: "Added in 5.3.1: the blacklist as one regular expression." },
      },
    },
    BaseConstructor: {
      role: "fix",
      note: "Gained the check used by the fix.",
      gates: {
        check_state_key: { role: "fix", note: "Added in 5.3.1: rejects a blacklisted key with a ConstructorError." },
      },
    },
    UnsafeConstructor: {
      role: "fix",
      note: "Keeps the old, unchecked behaviour on purpose. Never use it on untrusted input.",
      gates: {
        set_python_instance_state: { role: "fix", note: "Added in 5.3.1: calls the parent with unsafe=True, skipping the check." },
      },
    },
    FullLoader: {
      role: "path",
      note: "The loader behind yaml.full_load, and the default of yaml.load at the time.",
      gates: {},
    },
  },
};
