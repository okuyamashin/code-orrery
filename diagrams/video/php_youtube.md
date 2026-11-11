# YouTube 用の文面（PHP2Shell / php-src）

動画ファイル: `php_tour_1080p.mp4`（1920×1080, 30fps, 2:14）
字幕: `php_tour_1080p.en.srt`（英語） / `php_tour_1080p.ja.srt`（日本語、`php_subtitles_ja.json` の訳から生成）
サムネイル: `php_tour_1080p.thumbnail.png`
チャプター元: `php_tour_1080p.chapters.txt`

本編は英語ナレーション。YouTube の「翻訳」でタイトルと説明を日本語でも登録できます。

---

## タイトル

英語（どれか 1 つ）:

1. **How a File Upload Could Corrupt a PHP Request — PHP2Shell (CVE-2026-109618) in 3D**
2. PHP2Shell, Visualized: Slicing php-src Down to the Files That Mattered
3. A Slice of PHP's C Engine: The PHP2Shell Incident in 3D

日本語:

- **ファイルのアップロードが PHP のリクエストを壊す — PHP2Shell（CVE-2026-109618）を 3D で**
- PHP2Shell を可視化：約 6000 関数から「関係する所だけ」を切り出す
- PHP エンジン（C）のスライス：PHP2Shell インシデントを 3D で

---

## 説明（英語）

A narrated 3D tour of the PHP2Shell incident (CVE-2026-109618 / CVE-2026-109619, October 2026) — shown not as all of PHP, but as a slice of its C engine.

php-src has almost 6,000 functions. Showing every one would explain nothing, so this is a slice: a handful of files on one request path, pulled out of the whole source tree with their immediate neighbours. Here a source file is a planet and a function is a gate on it. Lines of light between planets are calls that cross file boundaries.

The incident: when PHP ran out of memory, it jumped straight out of a half-finished request with a longjmp, leaving the request's state corrupted. A large multipart upload, combined with session upload-progress, could reach that state before a request was fully set up. The model is the fixed release, 8.4.27 — where the bug lived blinks red, the path that reached it pulses amber, and what the fix hardened glows green.

Nothing here is placed by hand. A static call graph of the C source is sliced around a few seed functions, and the colours and the narrated tour are generated from that slice.

How to read it
• Planet = source file (size grows with the lines of its functions)
• Bright planet = on the request path; dim planet = periphery, kept for context
• Gate = function
• Red = where the bug lived · Amber = the path that reached it · Green = what the fix hardened
• Lines between planets = calls that cross file boundaries

Chapters
0:00 The slice
0:18 rfc1867.c — reading the upload
0:30 The request allocator
0:41 The bailout (the problem)
0:55 session.c — upload progress runs mid-parse
1:09 Decoding the session
1:20 Delayed out-of-memory (the fix)
1:34 Fail cleanly
1:47 Reset between requests
1:58 Summary

Notes
• The call graph comes from static analysis, so calls made through function pointers or macros may be inferred or missing.
• This is a deliberately small slice (14 files of ~480, 87 functions of ~5,900); it shows the path of one incident, not the whole engine.
• Analyzed version: php-src 8.4.27 (the fixed release). The fix: https://github.com/php/php-src/commit/506e87f

Source code of this visualizer (open source): https://github.com/okuyamashin/code-orrery
Live 3D demo: https://okuyamashin.github.io/code-orrery/php/system.html?tour=incident
PHP by the PHP Group and contributors: https://github.com/php/php-src

#php #security #cve #codevisualization #threejs #opensource

---

## 説明（日本語）

PHP2Shell（CVE-2026-109618 / CVE-2026-109619、2026 年 10 月）というインシデントを、PHP 全体ではなく、その C エンジンの「スライス」として読み上げ付きで巡る 3D ツアーです。

php-src には関数が約 6000 個あります。全部を見せても何も分からないので、これはスライスです。ある一つのリクエスト経路にあるひと握りのファイルを、周辺だけ付けてソースツリーから抜き出しています。ここではソースファイルが惑星、関数がその上のゲートです。惑星どうしを結ぶ光の線は、ファイルをまたぐ呼び出しです。

インシデントの中身：PHP はメモリが尽きると longjmp で未完成のリクエストから一気に脱出し、状態が壊れたまま残っていました。大きなマルチパートのアップロードと session upload-progress を組み合わせると、リクエストが完全に立ち上がる前にその状態へ届きました。モデルは修正後の 8.4.27 で、バグの在った所が赤く点滅し、そこへ至る経路が琥珀色、修正で固めた所が緑に光ります。

手で置いたものはありません。C ソースの静的な呼び出しグラフを、いくつかの起点関数のまわりで切り出し、色分けと読み上げツアーはそのスライスから生成しています。

見方
• 惑星 = ソースファイル（関数の行数で大きくなる）
• 明るい惑星 = リクエスト経路の上 / 暗い惑星 = 周辺（文脈として残したもの）
• ゲート = 関数
• 赤 = バグの在った所 ・ 琥珀 = そこへ至る経路 ・ 緑 = 修正で固めた所
• 惑星どうしの線 = ファイルをまたぐ呼び出し

チャプター
0:00 スライスとは
0:18 rfc1867.c — アップロードを読む
0:30 リクエスト用アロケータ
0:41 bailout（問題）
0:55 session.c — 解析中に upload progress が走る
1:09 セッションの復号
1:20 遅延 out-of-memory（修正）
1:34 きれいに失敗する
1:47 リクエスト間でリセット
1:58 まとめ

補足
• 呼び出しの関係は静的解析によるもので、関数ポインタやマクロ経由の呼び出しは推測によるものや、拾えていないものがあります。
• これは意図的に小さなスライスです（約 480 ファイル中 14、約 5900 関数中 87）。あるインシデントの経路だけを示すもので、エンジン全体ではありません。
• 解析した版: php-src 8.4.27（修正後の版）。修正コミット: https://github.com/php/php-src/commit/506e87f

この可視化ツールのソースコード（オープンソース）: https://github.com/okuyamashin/code-orrery
3D デモ（ブラウザで操作できます）: https://okuyamashin.github.io/code-orrery/php/system.html?tour=incident
PHP（PHP Group とコントリビューター）: https://github.com/php/php-src

#PHP #セキュリティ #CVE #コード可視化 #threejs #オープンソース
