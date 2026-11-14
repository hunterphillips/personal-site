// Regenerates the @keyframes for the Realign demo loop and splices them into
// src/pages/AppLandingPage.css between the rd-keyframes markers.
// Edit the layouts or times below, then run: node scripts/realign-demo-keyframes.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cssPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/pages/AppLandingPage.css',
);

const DURATION = 14; // seconds; keep in sync with --d on .rd
const OUT = 'cubic-bezier(0.3, 0.7, 0.2, 1)';
const INOUT = 'cubic-bezier(0.45, 0, 0.2, 1)';
const LINEAR = 'linear';

// Window frames [x, y, w, h] in the 640×384 scene.
// Saved laptop layout, drawn while the laptop fills the view.
const saved = {
  term: [128, 52, 110, 110],
  notes: [128, 168, 110, 110],
  editor: [244, 52, 150, 226],
  browser: [400, 52, 112, 226],
};
// Where the cursor leaves the two windows it drags.
const moved = { browser: [306, 56, 112, 226], notes: [196, 118, 110, 110] };
const dragTimes = { browser: [2.2, 2.9], notes: [3.0, 3.7] };
const grabOffset = { browser: [50, 5], notes: [44, 5] };
// Layout saved for the monitor plus the laptop.
const docked = {
  browser: [22, 60, 151, 181],
  editor: [179, 60, 151, 181],
  term: [368, 133, 116, 138],
  notes: [490, 133, 116, 138],
};

// The laptop screen and its base, full view and widened view.
const laptopBig = [120, 36, 400, 250];
const laptopSmall = [362, 121, 250, 156];
const deckBig = [92, 286, 456, 10];
const deckSmall = [344, 277, 286, 8];

const round = (n) => Math.round(n * 10) / 10;
// The same frame once the view has widened and the laptop is drawn smaller.
const shrink = ([x, y, w, h]) => [
  round(362 + (x - 120) * 0.625),
  round(121 + (y - 36) * 0.625),
  round(w * 0.625),
  round(h * 0.625),
];
const box = ([x, y, w, h]) => `--x: ${x}; --y: ${y}; --w: ${w}; --h: ${h};`;
const opacity = (value) => `opacity: ${value};`;
const raw = (value) => value;
const percent = (t) => `${Math.round((t / DURATION) * 10000) / 100}%`;

// points: [time, value, easing of the segment that starts at this point]
function keyframes(name, points, format) {
  const lines = points.map(([t, value, easing], index) => {
    const timing =
      easing && index < points.length - 1
        ? ` animation-timing-function: ${easing};`
        : '';
    return `  ${percent(t)} { ${format(value)}${timing} }`;
  });
  return `@keyframes ${name} {\n${lines.join('\n')}\n}`;
}

const blocks = [];

['editor', 'term', 'browser', 'notes'].forEach((name, index) => {
  const lag = index * 0.05;
  const home = saved[name];
  const points = [[0, home]];
  if (moved[name]) {
    const [start, end] = dragTimes[name];
    points.push(
      [start, home, INOUT],
      [end, moved[name]],
      [4.7 + lag, moved[name], OUT],
      [5.3 + lag, home],
    );
  }
  points.push(
    [6.3, home, INOUT],
    [7.0, shrink(home)],
    [8.7 + lag, shrink(home), OUT],
    [9.4 + lag, docked[name]],
    [11.9 + lag, docked[name], OUT],
    [12.6 + lag, shrink(home)],
    [13.0, shrink(home), INOUT],
    [13.8, home],
    [14, home],
  );
  blocks.push(keyframes(`rd-${name}`, points, box));
});

for (const [name, big, small] of [
  ['rd-laptop', laptopBig, laptopSmall],
  ['rd-deck', deckBig, deckSmall],
]) {
  blocks.push(
    keyframes(
      name,
      [
        [0, big],
        [6.3, big, INOUT],
        [7.0, small],
        [13.0, small, INOUT],
        [13.8, big],
        [14, big],
      ],
      box,
    ),
  );
}

const hidden = 'opacity: 0; transform: translateX(calc(var(--u) * -60));';
const shown = 'opacity: 1; transform: none;';
blocks.push(
  keyframes(
    'rd-external',
    [
      [0, hidden],
      [6.3, hidden, INOUT],
      [7.0, shown],
      [13.0, shown, INOUT],
      [13.8, hidden],
      [14, hidden],
    ],
    raw,
  ),
);

const loose = 'transform: rotate(9deg);';
const plugged = 'transform: none;';
blocks.push(
  keyframes(
    'rd-cable',
    [
      [0, loose],
      [7.4, loose, OUT],
      [7.7, plugged],
      [11.4, plugged, INOUT],
      [11.7, loose],
      [14, loose],
    ],
    raw,
  ),
);
blocks.push(
  keyframes(
    'rd-lit',
    [
      [0, 0],
      [7.7, 0, LINEAR],
      [8.0, 1],
      [11.7, 1, LINEAR],
      [11.9, 0],
      [14, 0],
    ],
    opacity,
  ),
);
blocks.push(
  keyframes(
    'rd-keys',
    [
      [0, 1],
      [2.0, 1, LINEAR],
      [2.3, 0],
      [3.9, 0, LINEAR],
      [4.2, 1],
      [5.7, 1, LINEAR],
      [6.0, 0],
      [13.7, 0, LINEAR],
      [14, 1],
    ],
    opacity,
  ),
);
// The fourth key reads S for the save press and R for the restore press.
blocks.push(
  keyframes(
    'rd-key-s',
    [
      [0, 1],
      [2.3, 1],
      [2.31, 0],
      [13.6, 0],
      [13.61, 1],
      [14, 1],
    ],
    opacity,
  ),
);
blocks.push(
  keyframes(
    'rd-key-r',
    [
      [0, 0],
      [2.3, 0],
      [2.31, 1],
      [13.6, 1],
      [13.61, 0],
      [14, 0],
    ],
    opacity,
  ),
);

const keyUp =
  'transform: none; box-shadow: 0 calc(var(--u) * 3) 0 #d8d8de; background: #fff; color: #3a3a3c; border-color: #d8d8de;';
const keyDown =
  'transform: translateY(calc(var(--u) * 3)); box-shadow: 0 0 0 #5f7dfb; background: #e3e9ff; color: #2a3aa8; border-color: #5f7dfb;';
blocks.push(
  keyframes(
    'rd-key',
    [
      [0, keyUp],
      [1.0, keyUp, LINEAR],
      [1.08, keyDown],
      [1.6, keyDown, LINEAR],
      [1.75, keyUp],
      [4.5, keyUp, LINEAR],
      [4.58, keyDown],
      [5.1, keyDown, LINEAR],
      [5.25, keyUp],
      [14, keyUp],
    ],
    raw,
  ),
);

// The menu bar icon pulses whenever Realign acts.
const pingRest = 'opacity: 0; transform: scale(0.3);';
const pingStart = 'opacity: 0.95; transform: scale(0.3);';
const pingEnd = 'opacity: 0; transform: scale(1.6);';
const ping = [[0, pingRest]];
for (const t of [1.15, 4.65, 8.2, 11.8]) {
  ping.push([t, pingRest], [t + 0.01, pingStart, OUT], [t + 0.7, pingEnd]);
}
ping.push([14, pingEnd]);
blocks.push(keyframes('rd-ping', ping, raw));

// The cursor holds each dragged window by its title bar.
const grab = (name, frame) => [
  frame[0] + grabOffset[name][0],
  frame[1] + grabOffset[name][1],
];
const cursor = ([x, y, visible]) =>
  `--x: ${x}; --y: ${y}; opacity: ${visible};`;
blocks.push(
  keyframes(
    'rd-cursor',
    [
      [0, [330, 170, 0]],
      [1.9, [330, 170, 0], INOUT],
      [dragTimes.browser[0], [...grab('browser', saved.browser), 1], INOUT],
      [dragTimes.browser[1], [...grab('browser', moved.browser), 1], INOUT],
      [dragTimes.notes[0], [...grab('notes', saved.notes), 1], INOUT],
      [dragTimes.notes[1], [...grab('notes', moved.notes), 1], INOUT],
      [4.0, [430, 150, 0]],
      [14, [430, 150, 0]],
    ],
    cursor,
  ),
);

const START =
  '/* rd-keyframes:start (generated by scripts/realign-demo-keyframes.mjs) */';
const END = '/* rd-keyframes:end */';
const css = await readFile(cssPath, 'utf8');
const from = css.indexOf(START);
const to = css.indexOf(END);
if (from === -1 || to === -1) {
  throw new Error('rd-keyframes markers not found in AppLandingPage.css');
}
await writeFile(
  cssPath,
  `${css.slice(0, from)}${START}\n${blocks.join('\n')}\n${css.slice(to)}`,
);
