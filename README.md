# code-orrery

A Python codebase shown as a planetary system in a 3D net space.

Every class is a planet. Its methods are gates on the surface, its fields orbit the core, and calls inside a class arc over the surface. Lines of light between planets are calls and references that cross class boundaries, and thick glowing conduits show inheritance. Nothing is drawn by hand: the structure comes from static analysis of the source, the descriptions come from its docstrings, and a narrated tour flies you through it.

The first target is [tinydb](https://github.com/msiemens/tinydb).

**Live demo:** <https://okuyamashin.github.io/code-orrery/> (press **PLAY** for the narrated tour)

**Video:** [A 3D tour of tinydb on YouTube](https://youtu.be/5UfSXObGKEc) (3:28, English narration, English and Japanese subtitles)

## Quick start

```bash
git clone https://github.com/okuyamashin/code-orrery.git
cd code-orrery
python3 -m http.server 8765 --directory diagrams
```

Then open <http://localhost:8765/3d/system.html> and press **PLAY** to start the narrated tour. The generated data for tinydb (`diagrams/3d/data.js`) is already included.

## Regenerating from source

Clone the target project next to the scripts (tested against tinydb commit `edff96a`):

```bash
git clone https://github.com/msiemens/tinydb.git
```

```bash
python3 analysis/call_graph.py tinydb/tinydb --json analysis/call_graph.json
python3 analysis/field_refs.py tinydb/tinydb --json analysis/field_refs.json
python3 analysis/public_api.py tinydb/tinydb tinydb/tests --json analysis/public_api.json
python3 analysis/export3d.py diagrams/3d/data.js
```

2D SVG diagrams:

```bash
python3 analysis/glyph_world.py diagrams/glyph_world.svg
```

## Rendering the tour as a video

Requires macOS (narration uses `say`).

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/playwright install chromium
.venv/bin/python analysis/render_video.py
```

This writes a 1920×1080, 30 fps mp4 plus YouTube chapters, subtitles and a thumbnail to `diagrams/video/`. Videos are not stored in this repository.

## GitHub Pages

The live demo is served from `docs/`. `docs/index.html` is the landing page; `docs/tinydb/` is a copy of the viewer in `diagrams/3d/` (the video renderer keeps using `diagrams/3d/`). After regenerating the data, refresh the copy:

```bash
python3 analysis/publish_pages.py
```

To publish, set the repository's Pages source to the `main` branch and the `/docs` folder.

## Layout

| Path | Contents |
|---|---|
| `analysis/` | Static analysis (call graph, fields, public API) and diagram/data generators |
| `diagrams/*.svg` | 2D glyph and class diagrams |
| `diagrams/3d/` | Three.js viewer: `system.html` (whole system with tour), `class_sphere.html` (one class) |
| `diagrams/video/` | Subtitles, chapters and timeline from the last render |
| `docs/` | GitHub Pages site: landing page and a copy of the viewer for tinydb |

## Visual vocabulary

- Planet = class (size grows with lines of code)
- Gate = method (open bright ring = public, dark ring = private, double ring = special method)
- Shapes around the core = fields (sphere), properties (octahedron), class variables (cube); amber = changes after construction
- Lines between planets = calls (pale cyan), object creation (green), implicit calls and delegation (pink), overrides (purple), `super()` (blue), references (dashed)
- Thick conduit = inheritance (broken amber = inheritance only for the type checker)

## License

[MIT](LICENSE). tinydb itself is a separate project with its own license; it is not included in this repository.
