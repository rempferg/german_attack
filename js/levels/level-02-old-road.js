window.MB = window.MB || {};

// Level data only: no scene code in here. See LEVELS.md for the schema.
MB.Levels.define({
  id: "old-road",
  number: 3,
  name: "The Old Road",
  subtitle: "Fields and fences on the way to the old chest.",
  brief: "Five defenses guard the road.",
  seed: 17,

  theme: {
    grass: 0x3f5c33,
    grassDark: 0x344e2b,
    grassLight: 0x507140,
    path: 0xa8875c,
    pathEdge: 0x7c6341,
    camp: 0x355f8c,
    campEdge: 0x79a9d6,
    tent: 0x2b4b70,
    flag: 0xffd24d,
    tree: 0x2a5a32,
    treeLight: 0x3d7a43,
    trunk: 0x5a3f2a,
    rock: 0x707a74,
    rockLight: 0x95a09a,
    bush: 0x3c6e38,
    flower: 0xffd24d,
    water: 0x2e5f73,
    waterLight: 0x4a849b,
    enemy: 0xa34a3f,
    enemyDark: 0x6e2f28,
    gold: 0xffd24d
  },

  pathWidth: 36,
  playerArea: { x: 10, y: 50, w: 130, h: 370 },
  path: [
    { x: 55, y: 380 },
    { x: 210, y: 380 },
    { x: 210, y: 170 },
    { x: 355, y: 170 },
    { x: 355, y: 380 },
    { x: 500, y: 380 },
    { x: 500, y: 170 },
    { x: 645, y: 170 },
    { x: 645, y: 380 },
    { x: 790, y: 380 },
    { x: 900, y: 380 }
  ],

  treasure: { x: 900, y: 380 },

  defenses: [
    { type: "tower", x: 270, y: 275 },
    { type: "tower", x: 420, y: 265 },
    { type: "tower", x: 565, y: 280 },
    { type: "tower", x: 720, y: 265 },
    { type: "ballista", x: 855, y: 310 }
  ],

  scenery: [
    { type: "tree", x: 48, y: 72, scale: 1.0 },
    { type: "tree", x: 112, y: 62, scale: 0.85 },
    { type: "tree", x: 170, y: 85, scale: 1.1 },
    { type: "tree", x: 300, y: 70, scale: 0.9 },
    { type: "tree", x: 380, y: 82, scale: 1.0 },
    { type: "tree", x: 452, y: 68, scale: 0.85 },
    { type: "tree", x: 532, y: 84, scale: 1.05 },
    { type: "tree", x: 612, y: 70, scale: 0.9 },
    { type: "tree", x: 690, y: 85, scale: 1.0 },
    { type: "tree", x: 772, y: 68, scale: 0.88 },
    { type: "tree", x: 852, y: 84, scale: 1.08 },
    { type: "tree", x: 925, y: 70, scale: 0.95 },
    { type: "tree", x: 940, y: 210, scale: 0.9 },
    { type: "tree", x: 940, y: 132, scale: 0.8 },
    { type: "tree", x: 800, y: 120, scale: 0.85 },
    { type: "tree", x: 690, y: 118, scale: 0.78 },
    { type: "pond", x: 165, y: 128, scale: 1.0 },
    { type: "rock", x: 315, y: 330, scale: 0.9 },
    { type: "rock", x: 615, y: 332, scale: 0.75 },
    { type: "rock", x: 910, y: 300, scale: 0.7 },
    { type: "bush", x: 172, y: 272, scale: 0.9 },
    { type: "bush", x: 470, y: 330, scale: 1.0 },
    { type: "bush", x: 770, y: 330, scale: 0.9 },
    { type: "bush", x: 905, y: 110, scale: 0.8 },
    { type: "flower", x: 175, y: 350, scale: 1.0 },
    { type: "flower", x: 330, y: 218, scale: 0.9 },
    { type: "flower", x: 470, y: 218, scale: 0.8 },
    { type: "flower", x: 610, y: 218, scale: 1.0 },
    { type: "flower", x: 760, y: 330, scale: 0.8 },
    { type: "flower", x: 930, y: 400, scale: 0.9 }
  ]
});
