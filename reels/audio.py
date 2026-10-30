"""Synthesize a festive dhol/tabla track with a bansuri tune, tanpura drone and SFX from a cue sheet.

usage: python3 audio.py cues.json out.wav
cues.json: {"bpm":130, "duration":18.0,
            "sections":[{"start_beat":0,"beats":6,"style":"intro"}, ...],   # styles: intro | groove | lift | outro
            "sfx":[{"beat":6,"type":"whoosh"}, ...],                        # types: whoosh | pop | ding | tick | chime
            "key":"D"}
All sound is generated here, so the track is royalty-free.
"""
import json, sys, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / decay)


def lowpass(x, cutoff):
    """One-pole low-pass; cutoff may be a scalar or a per-sample array (Hz)."""
    c = np.broadcast_to(np.asarray(cutoff, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


# ---------- percussion ----------
def dhol_dum(gain=1.0):
    n = int(0.45 * SR); t = np.arange(n) / SR
    f = 52 + 38 * np.exp(-t / 0.04)                      # pitch drop gives the thump
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.18)
    click = lowpass(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.006) * 0.6
    return gain * (body + click)


def dhol_ta(gain=1.0):
    n = int(0.2 * SR); t = np.arange(n) / SR
    noise = highpass(rng.standard_normal(n), 900) * env(n, 0.0008, 0.035)
    tone = np.sin(2 * np.pi * 310 * t) * env(n, 0.001, 0.05) * 0.5
    return gain * 0.55 * (noise + tone)


def tabla_na(freq=520, gain=1.0):
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = freq * (1 + 0.015 * np.exp(-t / 0.02))
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + 0.45 * np.sin(2 * ph) * np.exp(-t / 0.05) + 0.25 * np.sin(3 * ph) * np.exp(-t / 0.03))
    strike = highpass(rng.standard_normal(n), 2000) * env(n, 0.0003, 0.004) * 0.4
    return gain * 0.35 * (s * env(n, 0.001, 0.12) + strike)


def tabla_ge(gain=1.0):
    n = int(0.6 * SR); t = np.arange(n) / SR
    f = 78 + 34 * (1 - np.exp(-t / 0.12))                # bayan "meend" glide upward
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.22)
    return gain * 0.7 * s


def shaker(gain=1.0):
    n = int(0.07 * SR)
    return gain * 0.12 * highpass(rng.standard_normal(n), 5000) * env(n, 0.004, 0.018)


# ---------- tonal ----------
NOTE = {"D": 293.66}
# D major pentatonic plus the 4th, a light folk/festive feel: D E F# G A B
SCALE = [0, 2, 4, 5, 7, 9, 12, 14]


def bansuri(freq, dur, gain=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    vib = 1 + 0.006 * np.sin(2 * np.pi * 5.2 * t) * np.clip((t - 0.12) / 0.2, 0, 1)
    ph = 2 * np.pi * np.cumsum(freq * vib) / SR
    tone = np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph)
    breath = lowpass(rng.standard_normal(n), 3000) * 0.05
    a = np.clip(t / 0.05, 0, 1) * np.clip((dur - t) / 0.08, 0, 1)
    return gain * 0.22 * (tone + breath) * a


def drone(dur, root, gain=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    out = np.zeros(n)
    for f, g in [(root / 2, 1.0), (root * 0.75, 0.6), (root, 0.5), (root * 1.5 / 2, 0.4)]:
        for det in (-0.6, 0.6):
            ph = 2 * np.pi * (f + det) * t
            out += g * (np.sin(ph) + 0.3 * np.sin(2 * ph) + 0.15 * np.sin(3 * ph))
    shimmer = 0.75 + 0.25 * np.sin(2 * np.pi * 0.25 * t)
    fade = np.clip(t / 1.2, 0, 1) * np.clip((dur - t) / 1.5, 0, 1)
    return gain * 0.025 * out * shimmer * fade


# ---------- sfx ----------
def whoosh():
    n = int(0.55 * SR); t = np.arange(n) / SR
    cut = 300 + 5000 * np.sin(np.pi * t / t[-1]) ** 2
    s = lowpass(rng.standard_normal(n), cut)
    return 0.3 * s * np.sin(np.pi * t / t[-1]) ** 1.5


def pop():
    n = int(0.09 * SR); t = np.arange(n) / SR
    f = 500 + 900 * (t / t[-1])
    return 0.35 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.03)


def tick():
    n = int(0.05 * SR)
    return 0.3 * highpass(rng.standard_normal(n), 3000) * env(n, 0.0005, 0.008)


def bell(f0, dur=1.6, gain=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(g * np.sin(2 * np.pi * f0 * r * t) * np.exp(-t / d) for r, g, d in
            [(1, 1, .9), (2.76, .5, .35), (5.4, .25, .15), (8.93, .1, .08)])
    return gain * 0.28 * s


def ding():
    return bell(1318.5)


def chime():
    a = bell(1174.7, 1.0, .8); b = bell(1568.0, 1.2, .8)
    out = np.zeros(len(b) + int(0.09 * SR)); out[:len(a)] += a; out[int(0.09 * SR):] += b
    return out


SFX = {"whoosh": whoosh, "pop": pop, "ding": ding, "tick": tick, "chime": chime}

# 16-step bar patterns: (step, instrument, gain)
GROOVE = [(0, "dum", 1), (0, "ge", .6), (3, "na", .5), (4, "ta", .9), (6, "dum", .7), (7, "na", .6),
          (8, "dum", .9), (8, "ge", .5), (10, "na", .7), (11, "tin", .5), (12, "ta", 1), (14, "na", .6), (15, "tin", .45)]
LIFT = GROOVE + [(2, "ta", .5), (5, "na", .4), (9, "ta", .5), (13, "na", .5)]
INTRO = [(0, "na", .55), (6, "na", .4), (8, "tin", .45), (12, "na", .5), (14, "tin", .35)]
OUTRO = [(0, "dum", 1), (0, "ge", .7), (4, "ta", .6), (8, "na", .5)]
PATTERNS = {"groove": GROOVE, "lift": LIFT, "intro": INTRO, "outro": OUTRO}
HITS = {"dum": dhol_dum, "ta": dhol_ta, "na": lambda g: tabla_na(520, g), "tin": lambda g: tabla_na(780, g), "ge": tabla_ge}

# two-bar bansuri phrase in scale degrees: (step_in_2_bars, degree, length_in_steps)
PHRASE = [(0, 4, 3), (3, 5, 1), (4, 4, 2), (6, 2, 2), (8, 1, 4), (12, 2, 2), (14, 4, 2),
          (16, 5, 3), (19, 6, 1), (20, 5, 2), (22, 4, 2), (24, 2, 6), (30, 1, 2)]


def place(buf, clip, t):
    i = int(t * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i]


def build(cues):
    bpm = cues["bpm"]; beat = 60.0 / bpm; step = beat / 4
    dur = cues["duration"]; n = int((dur + 0.6) * SR)
    drums = np.zeros(n); mel = np.zeros(n); fx = np.zeros(n)
    root = NOTE.get(cues.get("key", "D"), 293.66)
    for sec in cues["sections"]:
        t0 = sec["start_beat"] * beat; steps = int(sec["beats"] * 4); style = sec["style"]
        pat = PATTERNS[style]
        for s in range(steps):
            bar_step = s % 16
            for st, inst, g in pat:
                if st == bar_step:
                    place(drums, HITS[inst](g), t0 + s * step)
            if style in ("groove", "lift") and s % 2 == 1:
                place(drums, shaker(0.8 if s % 4 == 3 else 0.5), t0 + s * step)
            if style == "intro" and s % 4 == 2:
                place(drums, shaker(0.6), t0 + s * step)
        if style in ("intro", "groove", "lift"):
            g = {"intro": .7, "groove": .55, "lift": .65}[style]
            for s0 in range(0, steps, 32):
                for st, deg, ln in PHRASE:
                    if s0 + st < steps:
                        f = root * 2 ** (SCALE[deg % len(SCALE)] / 12)
                        place(mel, bansuri(f, ln * step * 0.95, g), t0 + (s0 + st) * step)
        if style == "outro":
            f = root * 2 ** (SCALE[0] / 12)
            place(mel, bansuri(f, min(2.0, sec["beats"] * beat), .6), t0 + 2 * beat)
    for e in cues.get("sfx", []):
        place(fx, SFX[e["type"]](), e["beat"] * beat + e.get("offset", 0))
    bed = drone(dur + 0.6, root)
    mix = 0.9 * drums + 1.0 * mel + 0.8 * fx
    # light stereo: drone and melody slightly wide, drums centred
    L = mix + bed * 1.0 + np.roll(mel, int(0.011 * SR)) * 0.12
    R = mix + bed * 0.9 + np.roll(mel, int(0.017 * SR)) * 0.12
    st = np.stack([L, R], 1)
    st = np.tanh(st * 1.1) / np.tanh(1.1)
    fade = np.clip((dur + 0.6 - np.arange(n) / SR) / 0.8, 0, 1)
    st *= fade[:, None]
    st *= 0.89 / max(1e-9, np.abs(st).max())
    return st[: int(dur * SR)]


if __name__ == "__main__":
    cues = json.load(open(sys.argv[1]))
    audio = build(cues)
    with wave.open(sys.argv[2], "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((audio * 32767).astype("<i2").tobytes())
    print("wrote", sys.argv[2], round(len(audio) / SR, 2), "s")
