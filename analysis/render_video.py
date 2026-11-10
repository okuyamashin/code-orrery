"""惑星系のツアーを、ナレーション付きの動画（mp4）として書き出す。

流れ:
  1. diagrams/ を一時的な HTTP サーバーで配信し、system.html?render=1 を自動ブラウザで開く
  2. ページからツアーの場面（題名と読み上げ文）を受け取る
  3. macOS の say で場面ごとの音声を作り、その長さから台本（タイムライン）を決める
  4. 時刻を 1/fps 秒ずつ進めながら画面を撮り、ffmpeg に流し込んで mp4 にする
  5. YouTube 用のチャプター一覧とサムネイル画像も書き出す

使い方:
  .venv/bin/python analysis/render_video.py                     # 1920x1080, 30fps の全編
  .venv/bin/python analysis/render_video.py --start 0 --duration 20 --out diagrams/video/preview.mp4
  .venv/bin/python analysis/render_video.py --width 1920 --height 1080 --scale 2   # 3840x2160 (4K)

必要なもの: ffmpeg（なければ pip の imageio-ffmpeg）, Playwright (pip install playwright && python -m playwright install chromium), macOS の say
"""
import argparse
import functools
import http.server
import pathlib
import shutil
import subprocess
import sys
import json
import tempfile
import threading
import time
import wave

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "diagrams"
RATE = 22050  # 音声のサンプリング周波数（モノラル 16bit）

LEAD_FIRST = 1.0   # 最初の場面: 読み上げが始まるまでの間（秒）
LEAD = 1.7         # 惑星へ飛ぶ時間を見込んだ間
TAIL = 0.9         # 読み上げのあとの余韻
END_HOLD = 2.5     # 最後の場面のあとに残す時間
MIN_SCENE = 10.5   # YouTube のチャプターは各 10 秒以上必要なので、場面をこれより短くしない


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def find_ffmpeg():
    """PATH の ffmpeg、なければ imageio-ffmpeg に同梱のものを使う。"""
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg が見つかりません（brew install ffmpeg か pip install imageio-ffmpeg）")


def serve(directory):
    handler = functools.partial(QuietHandler, directory=str(directory))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def synthesize(text, path, voice, wpm):
    subprocess.run(["say", "-v", voice, "-r", str(wpm), "-o", str(path),
                    "--file-format=WAVE", f"--data-format=LEI16@{RATE}", text], check=True)
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate(), w.readframes(w.getnframes())


def build_timeline(durations):
    tl, t = [], 0.0
    for i, d in enumerate(durations):
        lead = LEAD_FIRST if i == 0 else LEAD
        end = t + max(MIN_SCENE, lead + d + TAIL) + (END_HOLD if i == len(durations) - 1 else 0)
        tl.append({"index": i, "start": t, "speechStart": t + lead, "speechDur": d, "end": end})
        t = end
    return tl


def mix_audio(timeline, pcms, path, t0, t1):
    """場面ごとの音声を、読み上げ開始時刻に置いた 1 本の音声にする（t0〜t1 秒を切り出す）。"""
    total = int((t1 - t0) * RATE)
    buf = bytearray(total * 2)
    for tl, pcm in zip(timeline, pcms):
        off = int((tl["speechStart"] - t0) * RATE) * 2
        # 範囲外をはみ出さないよう切り詰めて貼る
        a = max(0, off)
        b = min(len(buf), off + len(pcm))
        if b > a:
            buf[a:b] = pcm[a - off:b - off]
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(bytes(buf))


def fmt_time(sec):
    sec = int(sec)
    return f"{sec // 60}:{sec % 60:02d}"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--width", type=int, default=1920)
    ap.add_argument("--height", type=int, default=1080)
    ap.add_argument("--scale", type=float, default=1, help="画素の倍率（2 で 4K 相当）")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--voice", default="Samantha")
    ap.add_argument("--wpm", type=int, default=170, help="読み上げの速さ（1 分あたりの語数）")
    ap.add_argument("--start", type=float, default=0, help="書き出す範囲の開始（秒、試し書き用）")
    ap.add_argument("--duration", type=float, default=None, help="書き出す長さ（秒、省略で最後まで）")
    ap.add_argument("--out", default=str(ROOT / "diagrams/video/tinydb_tour.mp4"))
    ap.add_argument("--headed", action="store_true", help="ブラウザのウィンドウを表示して描く（GPU が使える）")
    ap.add_argument("--plan-only", action="store_true", help="台本・字幕・チャプターだけ作り、映像は描かない")
    args = ap.parse_args()

    from playwright.sync_api import sync_playwright

    out = pathlib.Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    work = pathlib.Path(tempfile.mkdtemp(prefix="tour_"))
    httpd = serve(SITE)
    url = f"http://127.0.0.1:{httpd.server_address[1]}/3d/system.html?render=1"

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=not args.headed,
                                     args=["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist",
                                           "--autoplay-policy=no-user-gesture-required"])
        page = browser.new_page(viewport={"width": args.width, "height": args.height},
                                device_scale_factor=args.scale)
        page.on("console", lambda m: m.type == "error" and print("[page]", m.text, file=sys.stderr))
        page.goto(url)
        page.wait_for_function("window.__renderReady === true", timeout=120_000)
        scenes = page.evaluate("window.__render.scenes()")

        # 音声と台本
        print(f"{len(scenes)} scenes; synthesizing narration with {args.voice}...")
        durations, pcms = [], []
        for i, sc in enumerate(scenes):
            d, pcm = synthesize(sc["text"], work / f"scene_{i:02d}.wav", args.voice, args.wpm)
            durations.append(d)
            pcms.append(pcm)
        timeline = build_timeline(durations)
        total = timeline[-1]["end"]
        t0 = args.start
        t1 = min(total, t0 + args.duration) if args.duration else total
        print(f"total {fmt_time(total)} ({total:.1f}s); rendering {t0:.1f}s - {t1:.1f}s")

        audio = work / "narration.wav"
        mix_audio(timeline, pcms, audio, t0, t1)

        # チャプター（YouTube の説明欄に貼る形式）
        chapters = out.with_suffix(".chapters.txt")
        chapters.write_text("\n".join(f"{fmt_time(tl['start'])} {sc['title']}"
                                      for tl, sc in zip(timeline, scenes)) + "\n")
        # 台本（訳の字幕を作るときに使う）と英語字幕
        out.with_suffix(".timeline.json").write_text(json.dumps(
            {"timeline": timeline, "scenes": scenes, "fps": args.fps, "total": total},
            ensure_ascii=False, indent=1))
        from subtitles import scene_cues, write_srt
        write_srt(out.with_suffix(".en.srt"),
                  scene_cues(timeline, {str(i): sc["text"] for i, sc in enumerate(scenes)}, "en"))
        if args.plan_only:
            browser.close()
            httpd.shutdown()
            for suffix in (".chapters.txt", ".timeline.json", ".en.srt"):
                print("wrote", out.with_suffix(suffix))
            return

        page.evaluate("tl => window.__render.setup(tl)", timeline)

        # サムネイル: 冒頭の全景で、字幕が出そろったころ
        thumb_t = timeline[0]["speechStart"] + timeline[0]["speechDur"] * 0.9
        page.evaluate("t => window.__render.frame(t)", thumb_t)
        page.screenshot(path=str(out.with_suffix(".thumbnail.png")))
        page.evaluate("tl => window.__render.setup(tl)", timeline)

        # コマを書き出して ffmpeg へ
        n = int(round((t1 - t0) * args.fps))
        fade_out = max(0, (t1 - t0) - 1.0)
        vf = f"fade=t=in:st=0:d=0.8,fade=t=out:st={fade_out:.2f}:d=1.0"
        cmd = [find_ffmpeg(), "-y", "-loglevel", "error",
               "-f", "image2pipe", "-framerate", str(args.fps), "-i", "-",
               "-i", str(audio),
               "-vf", vf, "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "192k", "-af", f"afade=t=out:st={fade_out:.2f}:d=1.0",
               "-movflags", "+faststart", str(out)]
        ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        # 開始時刻より前の動き（カメラ移動など）を追いつかせる
        if t0 > 0:
            t = 0.0
            while t < t0:
                page.evaluate("t => window.__render.frame(t)", t)
                t += 1 / args.fps
        started = time.time()
        for i in range(n):
            t = t0 + i / args.fps
            page.evaluate("t => window.__render.frame(t)", t)
            ff.stdin.write(page.screenshot(type="png"))
            if i % 60 == 0 or i == n - 1:
                el = time.time() - started
                eta = el / (i + 1) * (n - i - 1)
                print(f"\r  frame {i + 1}/{n}  {fmt_time(t)}  eta {fmt_time(eta)}", end="", flush=True)
        print()
        ff.stdin.close()
        ff.wait()
        browser.close()
    httpd.shutdown()
    if ff.returncode != 0:
        sys.exit("ffmpeg failed")
    print("wrote", out)
    print("wrote", chapters)
    print("wrote", out.with_suffix(".en.srt"))
    print("wrote", out.with_suffix(".thumbnail.png"))


if __name__ == "__main__":
    main()
