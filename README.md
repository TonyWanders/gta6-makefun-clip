# Clip GTA 6 for the most YouTube views — make.fun

Bounty: https://make.fun/bounty/gta6-clipper-01
Prize: $500 USDC, 20 places paid — 1st $100, 2nd $70, 3rd $50, 4th–10th $20 each, 11th–20th $14 each.
Deadline: Mon 23 Nov 2026 01:00 UTC (02:00 WAT Mon 23 Nov).
Places go by YouTube views, most first. At most 5 submissions a day, 10 in all; the last submission before the deadline is the final entry.

## The clip

File: `gta6-makefun-clip.mp4` — 30 seconds, 1080x1920 vertical, MP4 H.264/AAC, 30 fps.
Built by `main.ts` (Node 22+, standard library only) with ffmpeg. No make.fun skill/kit was installed.

## Moment chosen and why

Source: Grand Theft Auto VI Trailer 2, official Rockstar Games YouTube channel,
https://www.youtube.com/watch?v=VQRLujxTm3c — the only footage used.
Local copy used here: `~/workspace/goals/gta-6-tiktok-clipping/files/gta6-playbook/media/raw/gta6-trailer2-official.mp4`
(1920x1080, 166.8 seconds, published 6 May 2025). The trailer file itself is NOT in this repo.

Timestamps used: **1:22–1:52** (30 seconds).

Why this stretch, checked frame by frame:
- 1:22–1:27 Jason and Lucia sit on a golden dock at sunset, boat beside them — the most beautiful shot in the trailer, and instantly Vice City.
- 1:28–1:33 street life in Leonida (community service crew at dusk).
- ~1:34 a lively Vice City bar, Lucia dancing in the foreground.
- ~1:40 a purple-lit nightclub queue in Vice City.
- ~1:46 an overhead alley jump.
- ~1:52 a woman in sunglasses by her car in golden light — the clip ends on a striking character shot.

Rejected cut: 0:51–1:21 was rendered first, then checked and thrown away. Frame by frame it runs into the trailer's bedroom scene and the "ROCKSTAR GAMES PRESENTS" title card at ~1:10–1:20, which does not belong in a public Short, and the captions did not match the shots (Lucia walks out at ~1:02, not when the caption said so). The 1:22–1:52 cut has no title card and no bedroom scene, and every caption matches what is on screen.

This is a different cut from the earlier TikTok clip (0:32–1:02). The earlier gtavi-claudecode test scored 0:51–1:30 as the trailer's best moment (7.02), but that was a heuristic score, not a human frame check; the human check above overrules it.

Crop: the trailer is letterboxed (picture 1920x864 at y=108). The picture is cropped to 9:16 (486x864) and scaled to 1080x1920, so there are no black bars. Crop x=750, shifted right of centre, because the subjects in this stretch sit right of centre (the dock couple, the woman in sunglasses).

## On-screen text (pitch wording)

Clip time, burned in, large centred white/yellow text on a dark box:
- 0–6s: VICE CITY IS BACK
- 6–12s: WELCOME TO LEONIDA
- 12–18s: THIS CLIP WAS MADE WITH AI
- 18–24s: GET PAID TO MAKE / CLIPS LIKE THIS
- 24–30s: MAKE.FUN / $500 BOUNTY / MAKE CLIPS. EARN USDC.
- 27–30s: solid black end card under the MAKE.FUN lines.

The make.fun pitch is on screen from 18s to the end, so it cannot be missed, and the clip is disqualified without it.

Original trailer audio is kept.

## YouTube description to use on upload

Title suggestion: GTA 6 — Welcome to Vice City (Made with AI)

Description (the bounty line must be in it, plus the entrant's make.fun play code):

```
Vice City is back. This is Leonida.

Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
Play code: [ADD PLAY CODE HERE]

Footage: Grand Theft Auto VI Trailer 2, Rockstar Games. Fan clip, not affiliated with Rockstar Games.

#GTA6 #GrandTheftAuto #ViceCity #GTA
```

Upload as a public Short or video, keep it public until the results are out, then put the real YouTube URL in `VIDEO.json` (currently `TO_BE_UPLOADED`).

## How to rebuild

```sh
TRAILER_PATH=./source/gta6-trailer2-official.mp4 OUTPUT_DIR=./output node main.ts
```

Needs ffmpeg on PATH and Node.js 22.18 or later. No network, no install, no sign-in.

## Status / blockers for submission

- Clip built and verified (see below). NOT uploaded to YouTube.
- No YouTube channel for Anthony is known, so no upload was made and no URL was invented.
- No make.fun play code: there is no signed-in make.fun account to get one from. Add the code to the video description (or channel description) before submitting.
- Submission itself (GitHub repo + VIDEO.json + transcripts) is still to do, and needs the uploaded video URL first.
- Views are not bought or botted; that would disqualify the entry.

## Verification

- `ffprobe`: duration, resolution, codecs (see build log).
- 3 frames extracted from the finished clip (start, middle, end) and read to check the pitch text is legible and not cut off.
