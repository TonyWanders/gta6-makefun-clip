// main.ts — make.fun bounty: "Clip GTA 6 for the most YouTube views"
// https://make.fun/bounty/gta6-clipper-01
//
// What it does, with the standard library only:
//   1. Takes Rockstar's official Grand Theft Auto VI Trailer 2
//      (source file, NOT committed to the repo — see README.md)
//   2. Cuts 1:22-1:52 (30 seconds): Jason and Lucia on a golden dock
//      at sunset, then Vice City life — a bar, a nightclub queue, an
//      alley jump, and a woman in sunglasses by her car. That is the
//      moment people want to watch: the place, the people, the vibe.
//      (An earlier cut, 0:51-1:21, was checked frame by frame and
//      rejected: it runs into the trailer's bedroom / "ROCKSTAR GAMES
//      PRESENTS" title-card sequence at ~1:10-1:20, which does not
//      belong in a public Short.)
//   3. Crops the 1920x864 letterboxed picture to vertical 9:16 and
//      scales it to 1080x1920, 30 fps.
//   4. Burns in large centred captions, including the make.fun pitch
//      on screen, and a 3-second end card.
//   5. Writes gta6-makefun-clip.mp4 (H.264 / AAC) to the output dir.
//
// Run:  TRAILER_PATH=./source/gta6-trailer2-official.mp4 \
//       OUTPUT_DIR=./output node main.ts
// Needs ffmpeg on PATH and Node.js 22.18 or later (Node 24 works).
// No network use, no install, no sign-in, no payment.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// --- Config -----------------------------------------------------------------
const SOURCE_START = 82; // seconds into Trailer 2
const DURATION = 30; // seconds
const FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";
const SOURCE =
  process.env.TRAILER_PATH ?? "./source/gta6-trailer2-official.mp4";
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "./output";
const OUTPUT_FILE = join(OUTPUT_DIR, "gta6-makefun-clip.mp4");

// Trailer 2 is letterboxed: picture is 1920x864 starting at y=108.
// Centre-crop that picture to 9:16 (486x864) and scale up to 1080x1920.
// Crop x=750 (not centred) because the subjects in this stretch sit
// right of centre: the dock couple and the woman in sunglasses.
const CROP = "crop=486:864:750:108,scale=1080:1920";

type Caption = {
  text: string;
  from: number;
  to: number;
  y: number;
  size: number;
  color: string;
};

// On-screen text, in clip time (0-30s). The make.fun pitch runs 18-30s
// so a viewer who watches past the hook cannot miss it.
const CAPTIONS: Caption[] = [
  { text: "VICE CITY IS BACK", from: 0, to: 6, y: 1350, size: 76, color: "white" },
  { text: "WELCOME TO LEONIDA", from: 6, to: 12, y: 1350, size: 68, color: "white" },
  { text: "THIS CLIP WAS MADE WITH AI", from: 12, to: 18, y: 1350, size: 60, color: "white" },
  { text: "GET PAID TO MAKE", from: 18, to: 24, y: 1240, size: 64, color: "yellow" },
  { text: "CLIPS LIKE THIS", from: 18, to: 24, y: 1350, size: 64, color: "yellow" },
  { text: "MAKE.FUN", from: 24, to: 30, y: 700, size: 130, color: "yellow" },
  { text: "$500 BOUNTY", from: 24, to: 30, y: 880, size: 64, color: "white" },
  { text: "MAKE CLIPS. EARN USDC.", from: 24, to: 30, y: 1000, size: 52, color: "white" },
];

function drawText(c: Caption): string {
  return (
    `drawtext=fontfile=${FONT}:text='${c.text}':fontsize=${c.size}` +
    `:fontcolor=${c.color}:x=(w-text_w)/2:y=${c.y}` +
    `:box=1:boxcolor=black@0.65:boxborderw=28` +
    `:enable='between(t,${c.from},${c.to})'`
  );
}

function main(): void {
  if (!existsSync(SOURCE)) {
    throw new Error(
      `Trailer source not found: ${SOURCE}\n` +
        `Place the official Rockstar GTA VI Trailer 2 file there ` +
        `(see README.md) or set TRAILER_PATH.`
    );
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // End card: solid black panel for the last 3 seconds, under the
  // MAKE.FUN / $500 BOUNTY / MAKE CLIPS. EARN USDC. captions.
  const endCard =
    "drawbox=x=0:y=0:w=1080:h=1920:color=black:t=fill:enable='between(t,27,30)'";

  const filters = [CROP, ...CAPTIONS.slice(0, 5).map(drawText), endCard, ...CAPTIONS.slice(5).map(drawText)].join(",");

  const args = [
    "-y",
    "-ss", String(SOURCE_START),
    "-i", SOURCE,
    "-t", String(DURATION),
    "-vf", filters,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "20",
    "-pix_fmt", "yuv420p",
    "-r", "30",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    OUTPUT_FILE,
  ];

  console.log(`Cutting ${SOURCE_START}s-${SOURCE_START + DURATION}s from ${SOURCE}`);
  console.log(`Writing ${OUTPUT_FILE}`);
  execFileSync("ffmpeg", args, { stdio: "inherit" });
  console.log("Done.");
}

main();
