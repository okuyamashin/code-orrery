# YouTube 用の文面

動画ファイル: `tinydb_tour_1080p.mp4`（1920×1080, 30fps, 3:28）
字幕: `tinydb_tour_1080p.en.srt`（英語） / `tinydb_tour_1080p.ja.srt`（日本語）
サムネイル: `tinydb_tour_1080p.thumbnail.png`

GitHub の URL が決まったら、説明文の `[GitHub URL]` を置き換えてください。
（YouTube の説明欄には `<` と `>` が使えないので、記号の入った書き方は避けています）

---

## タイトル（どれか 1 つ）

1. **tinydb as a Planetary System — Python Source Code Visualized in 3D**
2. Flying Through a Python Codebase: tinydb as a 3D Net Space
3. Every Class Is a Planet: A 3D Tour of tinydb's Source Code

日本語タイトルを付ける場合（YouTube の「翻訳」でタイトルと説明を日本語でも登録できます）:

- **tinydb を惑星系で見る — Python のソースコードを 3D で可視化**
- Python のコードを宇宙として飛ぶ：tinydb の 3D ツアー

---

## 説明（英語）

A narrated 3D tour of tinydb, a tiny document-oriented database written in Python — visualized as a planetary system built from its own source code.

Every class is a planet. Its methods are gates on the planet's surface, its fields orbit the core, and calls inside a class arc over the surface. Lines of light between planets are calls and references that cross class boundaries; thick glowing conduits are inheritance.

Nothing here is drawn by hand. The structure comes from static analysis of tinydb's source, the descriptions are read from its own docstrings, and the narration is synthesized speech.

How to read it
• Planet = class (size grows with lines of code)
• Gate = method (bright ring with an opening = public, dark ring = private, double ring = special method)
• Small shapes around the core = fields (sphere), properties (octahedron), class variables (cube); amber = changes after construction
• Arcs outside a planet = calls within the class
• Lines between planets = method calls (pale cyan), object creation (green), implicit calls and delegation (pink), overrides (purple), super() (blue), references (dashed)
• Thick conduit = inheritance (broken amber conduit = inheritance only for the type checker)

Chapters
0:00 Overview
0:21 TinyDB
0:37 Table
0:52 Document
1:03 LRUCache
1:15 Query
1:28 QueryInstance
1:38 QueryLike
1:49 Storage
2:02 JSONStorage
2:15 MemoryStorage
2:28 Middleware
2:38 CachingMiddleware
2:50 FrozenDict
3:01 TinyDBPlugin
3:14 Wrap-up

Notes
• The call graph comes from static analysis, so some dynamic calls (functions passed as values, __getattr__ delegation) are inferred or missing.
• Line counts are per method and include docstrings.
• Analyzed version: tinydb 4.9.0

Source code of this visualizer (open source): [GitHub URL]
tinydb by Markus Siemens (MIT License): https://github.com/msiemens/tinydb

#python #codevisualization #softwarearchitecture #threejs #opensource

---

## 説明（日本語）

Python で書かれた小さな文書指向データベース tinydb を、ソースコードから組み立てた「惑星系」として、読み上げ付きで巡る 3D ツアーです。

クラスはひとつの惑星です。メソッドは惑星の表面に並ぶゲート、フィールドはコアのまわりを回る小さな形、クラスの中の呼び出しは表面の外を回る弧で表しています。惑星どうしを結ぶ光の線はクラスをまたぐ呼び出しや参照、太く光る管は継承です。

手で描いたものはありません。構造は tinydb のソースコードの静的解析から、説明文は tinydb 自身の docstring から取り、ナレーションは合成音声です。

見方
• 惑星 = クラス（コードの行数で大きくなる）
• ゲート = メソッド（切れ目のある明るいリング = 公開、暗いリング = 内部用、二重リング = 特殊メソッド）
• コアのまわりの小さな形 = フィールド（球）、プロパティ（八面体）、クラス変数（立方体）。琥珀色は生成後にも書き換わる値
• 惑星の外側を回る弧 = クラス内の呼び出し
• 惑星どうしの線 = メソッド呼び出し（淡い水色）、生成（緑）、暗黙の呼び出しと委譲（桃色）、上書き（紫）、super()（青）、参照（破線）
• 太い管 = 継承（琥珀色の途切れた管は、型チェッカーの上でだけの継承）

チャプター
0:00 全体
0:21 TinyDB
0:37 Table
0:52 Document
1:03 LRUCache
1:15 Query
1:28 QueryInstance
1:38 QueryLike
1:49 Storage
2:02 JSONStorage
2:15 MemoryStorage
2:28 Middleware
2:38 CachingMiddleware
2:50 FrozenDict
3:01 TinyDBPlugin
3:14 まとめ

補足
• 呼び出しの関係は静的解析によるもので、動的な呼び出し（値として渡された関数、__getattr__ による委譲など）は推測によるものや、拾えていないものがあります。
• 行数はメソッドごとの行数の合計で、docstring を含みます。
• 解析した版: tinydb 4.9.0

この可視化ツールのソースコード（オープンソース）: [GitHub URL]
tinydb（作者 Markus Siemens、MIT ライセンス）: https://github.com/msiemens/tinydb

#Python #コード可視化 #ソフトウェア設計 #threejs #オープンソース
