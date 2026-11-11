"""GitHub Pages 用の docs/ を更新する。

diagrams/3d/ の表示一式を docs/<name>/ にコピーするだけで、元のファイルには手を付けない
（動画の書き出しは diagrams/3d/ を使い続ける）。docs/index.html は手で書いた入口なので上書きしない。

使い方: python3 analysis/publish_pages.py [--name tinydb]
"""
import argparse
import pathlib
import shutil
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "diagrams" / "3d"
FILES = ["system.html", "class_sphere.html", "planet.js", "theme.js", "textures.js", "snapshot.js", "data.js", "narration.js"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", default="tinydb", help="docs/ の下に作るフォルダ名")
    args = ap.parse_args()

    docs = ROOT / "docs"
    dest = docs / args.name
    dest.mkdir(parents=True, exist_ok=True)
    for f in FILES:
        shutil.copy2(SRC / f, dest / f)
        print("copied", dest / f)

    # 入口ページに載せる静止画（動画の書き出しで作られるサムネイル）。なければ前のものを使い続ける
    thumb = ROOT / "diagrams" / "video" / f"{args.name}_tour_1080p.thumbnail.png"
    if thumb.exists():
        jpg = dest / "preview.jpg"
        # macOS の sips で JPEG にして軽くする（入口ページの読み込みを速くするため）
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82", str(thumb), "--out", str(jpg)],
                       check=True, stdout=subprocess.DEVNULL)
        print("wrote", jpg)

    # Jekyll の処理を止め、ファイルをそのまま配信させる
    (docs / ".nojekyll").touch()


if __name__ == "__main__":
    main()
