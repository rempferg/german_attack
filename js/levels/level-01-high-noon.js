window.MB = window.MB || {};

// Level data only: no scene code in here. See LEVELS.md for the schema.
MB.Levels.define({
  id: "high-noon",
  number: 2,
  name: "High Noon",
  subtitle: "Dust, cacti and outlaws.",
  brief: "Shoot your way to the gold.",
  seed: 41,

  // Gunpowder-era reskin: both roles carry firearms.
  unitStyle: "western",
  unitNames: { landsknecht: "Deputy", archer: "Gunslinger" },
  playerProjectile: "bullet",
  enemyProjectile: "bullet",
  enemyWord: { one: "Outlaw", many: "Outlaws", verb: "defeated" },
  battleLine: "Keep shooting until the road is clear!",

  theme: {
    grass: 0xa88952,
    grassDark: 0x947844,
    grassLight: 0xbda06a,
    path: 0xd8b47a,
    pathEdge: 0xa88652,
    camp: 0x7a4b32,
    campEdge: 0xd6a35f,
    tent: 0x6f442b,
    flag: 0xffd24d,
    tree: 0x4a6a3a,
    treeLight: 0x6a8a4a,
    trunk: 0x6a4a2a,
    rock: 0x8a7a62,
    rockLight: 0xb0a084,
    bush: 0x8a7a3a,
    flower: 0xd96a4a,
    water: 0x3f7280,
    waterLight: 0x619aa0,
    enemy: 0x6a3a2a,
    enemyDark: 0x4a251a,
    gold: 0xffd24d
  },

  pathWidth: 40,
  playerArea: { x: 10, y: 50, w: 130, h: 370 },
  path: [
    { x: 55, y: 380 },
    { x: 200, y: 380 },
    { x: 200, y: 200 },
    { x: 380, y: 200 },
    { x: 380, y: 390 },
    { x: 560, y: 390 },
    { x: 560, y: 210 },
    { x: 730, y: 210 },
    { x: 730, y: 380 },
    { x: 900, y: 380 }
  ],

  treasure: { x: 900, y: 380 },

  defenses: [
    { type: "bandit", x: 270, y: 300 },
    { type: "bandit", x: 440, y: 300 },
    { type: "bandit", x: 620, y: 300 },
    { type: "bandit", x: 790, y: 300 },
    { type: "bandit", x: 850, y: 190 }
  ],

  scenery: [
    { type: "cactus", x: 64, y: 72, scale: 1.0 },
    { type: "cactus", x: 136, y: 64, scale: 0.85 },
    { type: "cactus", x: 244, y: 78, scale: 1.05 },
    { type: "cactus", x: 314, y: 64, scale: 0.9 },
    { type: "cactus", x: 394, y: 76, scale: 1.0 },
    { type: "cactus", x: 464, y: 64, scale: 0.82 },
    { type: "cactus", x: 544, y: 78, scale: 1.08 },
    { type: "cactus", x: 614, y: 64, scale: 0.88 },
    { type: "cactus", x: 694, y: 76, scale: 1.02 },
    { type: "cactus", x: 764, y: 64, scale: 0.9 },
    { type: "cactus", x: 844, y: 78, scale: 1.06 },
    { type: "cactus", x: 914, y: 64, scale: 0.9 },
    { type: "cactus", x: 942, y: 250, scale: 0.85 },
    { type: "cactus", x: 942, y: 340, scale: 0.8 },
    { type: "rock", x: 210, y: 140, scale: 0.9 },
    { type: "rock", x: 360, y: 130, scale: 0.8 },
    { type: "rock", x: 500, y: 150, scale: 1.0 },
    { type: "rock", x: 640, y: 140, scale: 0.85 },
    { type: "rock", x: 780, y: 130, scale: 0.9 },
    { type: "rock", x: 900, y: 145, scale: 0.8 },
    { type: "bush", x: 170, y: 260, scale: 0.9 },
    { type: "bush", x: 480, y: 260, scale: 0.8 },
    { type: "bush", x: 680, y: 340, scale: 0.9 },
    { type: "bones", x: 255, y: 120, scale: 0.9 },
    { type: "bones", x: 600, y: 340, scale: 0.8 },
    { type: "bones", x: 850, y: 130, scale: 0.9 },
    { type: "pond", x: 160, y: 160, scale: 0.75 },
    { type: "campfire", x: 75, y: 170, scale: 1.0 },
    { type: "flower", x: 190, y: 330, scale: 0.8 },
    { type: "flower", x: 470, y: 330, scale: 0.9 },
    { type: "flower", x: 880, y: 330, scale: 0.8 },
    { type: "flower", x: 930, y: 400, scale: 0.8 }
  ]
});
