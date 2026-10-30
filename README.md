# Circulyst Studio

Instagram content system for Circulyst (Kanpur, pre-launch).

- `studio/index.html`: the Studio desk (Aaj, Calendar, Review, Leads, Insights, Shots, Brand, Live). Runs as a claude.ai artifact; data lives in the artifact's db.
- `reels/`: reel pipeline. HTML/CSS animation → `node render.js page.html out.mp4 audio.wav` (Chromium frames at 30fps → ffmpeg 1080×1920). `audio.py cues.json out.wav` makes the dhol/tabla/bansuri track from a cue sheet.
- `carousels/`: carousel, static and story frames. `node shoot.js C1 C2 S1 ST` renders `decks.js` decks at 1080×1350 (stories 1080×1920).
- `reels/chars3d`, `carousels/chars3d`: the 3D Kabaad Gang (transparent PNGs) and `swap3d.js`, which swaps the old 2D SVG characters for them.
- `brand/`: logo files, character brief v2, reference sheets.
- `scripts/host_reel.sh`: deploys one reel to the `circulyst-reels` Vercel project so vidIQ can publish it (needs `VERCEL_TOKEN`).
- `captions/`: linted captions.
- `exports/`: final rendered posts.

Rules: UCO (used cooking oil) on hold; founder never shown; no fixed ₹/kg rates ("Example rate" only); "70% turant, baaki verification ke baad", never "instant payout"; never imply pickups are live or give a launch date.
