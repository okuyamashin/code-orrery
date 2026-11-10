"""ツアー動画の字幕（SRT）を作る。

英語字幕は render_video.py が台本（.timeline.json）と一緒に書き出す。
日本語などの訳は、場面ごとの訳文を JSON（{"<場面番号>": "訳文", ...}）で用意し、
同じ台本のタイミングで SRT にする:

  python3 analysis/subtitles.py diagrams/video/tinydb_tour_1080p.timeline.json \\
      diagrams/video/subtitles_ja.json diagrams/video/tinydb_tour_1080p.ja.srt

各場面の読み上げ区間（speechStart から speechDur 秒）を、文の長さに比例して字幕に割り振る。
"""
import json
import pathlib
import re
import sys

LIMIT = {"en": 84, "ja": 42}  # 1 つの字幕に収める目安の文字数


def split_sentences(text, lang):
    if lang == "ja":
        parts = re.split(r"(?<=[。！？])", text)
    else:
        parts = re.split(r"(?<=[.!?])\s+", text)
    parts = [p.strip() for p in parts if p.strip()]
    out = []
    limit = LIMIT.get(lang, 84)
    for p in parts:
        # 長すぎる文は読点・カンマで分ける
        while len(p) > limit:
            sep = "、" if lang == "ja" else ", "
            cut = p.rfind(sep, 0, limit)
            if cut <= 0:
                break
            out.append(p[:cut + len(sep)].strip())
            p = p[cut + len(sep):].strip()
        out.append(p)
    # 短すぎる断片（「TinyDB。」など）は次の文と、合わせても短いものは前の文とまとめる
    sp = "" if lang == "ja" else " "
    merged, carry = [], ""
    for p in out:
        p = carry + sp + p if carry else p
        carry = ""
        if len(p) < limit * 0.3:
            carry = p
        elif merged and len(merged[-1]) + len(p) < limit * 0.6:
            merged[-1] += sp + p
        else:
            merged.append(p)
    if carry:
        if merged:
            merged[-1] += sp + carry
        else:
            merged.append(carry)
    return merged


def cues(text, start, dur, lang):
    parts = split_sentences(text, lang)
    total = sum(len(p) for p in parts) or 1
    t, out = start, []
    for p in parts:
        d = dur * len(p) / total
        out.append((t, t + d, p))
        t += d
    return out


def srt_time(sec):
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_srt(path, all_cues):
    lines = []
    for i, (a, b, text) in enumerate(all_cues, 1):
        lines += [str(i), f"{srt_time(a)} --> {srt_time(b)}", text, ""]
    pathlib.Path(path).write_text("\n".join(lines), encoding="utf-8")


def scene_cues(timeline, texts, lang):
    out = []
    for tl in timeline:
        text = texts.get(str(tl["index"])) or texts.get(tl["index"])
        if text:
            out += cues(text, tl["speechStart"], tl["speechDur"], lang)
    return out


def main():
    timeline_path, trans_path, out = sys.argv[1:4]
    lang = sys.argv[4] if len(sys.argv) > 4 else "ja"
    data = json.loads(pathlib.Path(timeline_path).read_text())
    texts = json.loads(pathlib.Path(trans_path).read_text())
    missing = [tl["index"] for tl in data["timeline"] if str(tl["index"]) not in texts]
    if missing:
        print("訳がない場面:", missing, file=sys.stderr)
    c = scene_cues(data["timeline"], texts, lang)
    write_srt(out, c)
    print("wrote", out, len(c), "cues")


if __name__ == "__main__":
    main()
