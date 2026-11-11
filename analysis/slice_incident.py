#!/usr/bin/env python3
"""Slice a call graph down to the neighbourhood of a few seed functions.

The point: a real code base has thousands of functions, but any one story only
touches a handful. Given seeds (the functions the story is about), this keeps:

  - the seeds themselves (depth 0),
  - everything reachable from a seed within FORWARD call hops (the code the
    story flows into), and
  - the direct callers of any seed, up to REVERSE hops (how the story is
    reached), for context only.

Everything else is dropped. Surviving functions are grouped by file; each file
that keeps at least one function becomes a "planet" in the viewer. Distance from
the nearest seed is recorded so the renderer can fade periphery into the
background.

The slice is driven by a spec file (JSON) that is pure description — seed names,
hop budgets, and optional role tags (which seeds to mark problem / path / fix).
No exploit steps live here; the spec only names functions and how far to walk.

Usage:
    python3 analysis/slice_incident.py \
        --graph analysis/php/callgraph-8.4.27.json \
        --spec  analysis/php/incident_php2shell.json \
        --out   analysis/php/slice.json
"""
import argparse
import collections
import json


def load_graph(path):
    data = json.load(open(path))
    g = data["functions"]
    by_name = collections.defaultdict(list)
    for key, node in g.items():
        by_name[node["name"]].append(key)
    # reverse edges
    callers = collections.defaultdict(set)
    for key, node in g.items():
        for tgt in node.get("calls_to", ()):
            callers[tgt].add(key)
    return g, by_name, callers


def resolve(names, by_name, g):
    """Map seed names (or explicit file::name keys) to node keys."""
    keys = []
    missing = []
    for n in names:
        if n in g:
            keys.append(n)
        elif n in by_name:
            keys.extend(by_name[n])
        else:
            missing.append(n)
    return keys, missing


def forward_bfs(seeds, g, max_hops):
    """distance from nearest seed following calls_to, capped at max_hops."""
    dist = {k: 0 for k in seeds}
    frontier = list(seeds)
    d = 0
    while frontier and d < max_hops:
        d += 1
        nxt = []
        for k in frontier:
            for tgt in g.get(k, {}).get("calls_to", ()):
                if tgt not in dist:
                    dist[tgt] = d
                    nxt.append(tgt)
        frontier = nxt
    return dist


def reverse_bfs(seeds, callers, max_hops):
    seen = set(seeds)
    frontier = list(seeds)
    d = 0
    out = {}
    while frontier and d < max_hops:
        d += 1
        nxt = []
        for k in frontier:
            for src in callers.get(k, ()):
                if src not in seen:
                    seen.add(src)
                    out[src] = d
                    nxt.append(src)
        frontier = nxt
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--graph", required=True)
    ap.add_argument("--spec", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    g, by_name, callers = load_graph(args.graph)
    spec = json.load(open(args.spec))

    forward = int(spec.get("forward_hops", 2))
    reverse = int(spec.get("reverse_hops", 1))

    seed_keys, missing = resolve(spec["seeds"], by_name, g)
    if missing:
        print("  warning: seeds not found:", ", ".join(missing))

    fdist = forward_bfs(seed_keys, g, forward)
    rdist = reverse_bfs(seed_keys, callers, reverse)

    # distance = min forward distance; reverse-only nodes get negative marker
    dist = dict(fdist)
    for k, d in rdist.items():
        if k not in dist:
            dist[k] = -d  # caller context, shown dim

    kept = set(dist)

    # Role tags: map named functions in the spec to roles for coloring.
    roles = {}
    for role in ("problem", "path", "fix"):
        for n in spec.get(role, []):
            for k in (by_name.get(n, []) if n not in g else [n]):
                roles[k] = role

    # Build file-grouped output.
    files = collections.defaultdict(lambda: {"functions": [], "min_dist": 99})
    for k in kept:
        node = g[k]
        f = node["file"]
        d = dist[k]
        role = roles.get(k)
        # edges to other kept nodes only
        out_edges = [t for t in node.get("calls_to", ()) if t in kept and t != k]
        files[f]["functions"].append({
            "key": k,
            "name": node["name"],
            "line": node["line"],
            "lines": node.get("lines", 1),
            "dist": d,
            "role": role,
            "calls_to": sorted(set(out_edges)),
        })
        files[f]["min_dist"] = min(files[f]["min_dist"], abs(d))

    # Sort functions within a file by distance then line.
    for f in files.values():
        f["functions"].sort(key=lambda x: (abs(x["dist"]), x["line"]))

    # Tier each file: core (holds a seed, min_dist 0) vs periphery.
    for f, info in files.items():
        info["tier"] = "core" if info["min_dist"] == 0 else "periphery"

    # Cap how many periphery files survive, keeping the best-connected ones.
    # Rank by number of kept functions, then closeness. The rest are dropped so
    # the viewer shows a bounded ring around the core instead of a hairball.
    max_peri = spec.get("max_periphery_files")
    if max_peri is not None:
        peri = [f for f, info in files.items() if info["tier"] == "periphery"]
        peri.sort(key=lambda f: (-len(files[f]["functions"]), files[f]["min_dist"]))
        drop = set(peri[int(max_peri):])
        for f in drop:
            del files[f]
        # prune dangling edges to dropped files
        kept_keys = {fn["key"] for info in files.values() for fn in info["functions"]}
        for info in files.values():
            for fn in info["functions"]:
                fn["calls_to"] = [t for t in fn["calls_to"] if t in kept_keys]

    out = {
        "title": spec.get("title", "incident slice"),
        "graph": args.graph,
        "forward_hops": forward,
        "reverse_hops": reverse,
        "seeds": seed_keys,
        "files": dict(sorted(files.items(), key=lambda kv: kv[1]["min_dist"])),
    }
    json.dump(out, open(args.out, "w"), indent=1)

    nfun = sum(len(f["functions"]) for f in files.values())
    print(f"{len(seed_keys)} seeds -> {nfun} functions across {len(files)} files "
          f"(forward {forward}, reverse {reverse}) -> {args.out}")
    print("  files kept:")
    for f, info in sorted(files.items(), key=lambda kv: kv[1]["min_dist"]):
        roled = sum(1 for fn in info["functions"] if fn["role"])
        tag = f"  [{roled} tagged]" if roled else ""
        print(f"    {len(info['functions']):3}  d{info['min_dist']}  {f}{tag}")


if __name__ == "__main__":
    main()
