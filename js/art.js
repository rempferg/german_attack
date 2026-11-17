window.MB = window.MB || {};

// Every piece of in-game art is drawn here. Levels choose colours and prop
// types through data, so a level author can add maps without touching scenes.
// Optional level images (background, scenery textures) are drawn when present;
// otherwise these procedural fallbacks are used.
MB.art = (function () {
  "use strict";

  const FALLBACK = {
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
  };

  function colour(theme, key) {
    return theme[key] != null ? theme[key] : FALLBACK[key];
  }

  function rng(seed) {
    let s = (seed || 1) >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function drawGround(g, level, theme) {
    const w = MB.config.WIDTH;
    const h = MB.config.HEIGHT;
    g.fillStyle(colour(theme, "grass"), 1);
    g.fillRect(0, 0, w, h);

    const rand = rng(level.seed || 1);
    for (let i = 0; i < 150; i++) {
      const x = rand() * w;
      const y = 42 + rand() * (h - 42);
      const rx = 5 + rand() * 22;
      const ry = 3 + rand() * 10;
      g.fillStyle(i % 2 ? colour(theme, "grassDark") : colour(theme, "grassLight"), 0.16);
      g.fillEllipse(x, y, rx * 2, ry);
    }

    g.lineStyle(1, colour(theme, "grassLight"), 0.35);
    for (let i = 0; i < 110; i++) {
      const x = rand() * w;
      const y = 46 + rand() * (h - 60);
      const len = 3 + rand() * 4;
      g.lineBetween(x, y, x + 1 + rand() * 2, y - len);
    }
  }

  function strokePath(g, points, width, fill, edge) {
    g.lineStyle(width + 8, edge, 1);
    g.beginPath();
    g.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) g.lineTo(points[i].x, points[i].y);
    g.strokePath();
    for (let i = 0; i < points.length; i++) {
      g.fillStyle(edge, 1);
      g.fillCircle(points[i].x, points[i].y, (width + 8) / 2);
    }

    g.lineStyle(width, fill, 1);
    g.beginPath();
    g.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) g.lineTo(points[i].x, points[i].y);
    g.strokePath();
    for (let i = 0; i < points.length; i++) {
      g.fillStyle(fill, 1);
      g.fillCircle(points[i].x, points[i].y, width / 2);
    }
  }

  function drawCamp(g, level, theme) {
    const area = level.playerArea;
    const start = level.path[0];
    const startBottom = start.y > area.y + area.h / 2;

    g.fillStyle(colour(theme, "camp"), 0.2);
    g.fillRoundedRect(area.x, area.y, area.w, area.h, 10);
    g.lineStyle(2, colour(theme, "campEdge"), 0.85);
    g.strokeRoundedRect(area.x, area.y, area.w, area.h, 10);

    const tentY = startBottom ? area.y + 58 : area.y + area.h - 58;
    drawTent(g, area.x + 38, tentY, 1, theme);
    drawTent(g, area.x + 92, tentY + 8, 0.85, theme);

    const flagX = area.x + 20;
    const flagY = startBottom ? area.y + area.h - 34 : area.y + 34;
    g.lineStyle(3, colour(theme, "trunk"), 1);
    g.lineBetween(flagX, flagY, flagX, flagY - 34);
    g.fillStyle(colour(theme, "flag"), 1);
    g.fillTriangle(flagX + 2, flagY - 34, flagX + 26, flagY - 26, flagX + 2, flagY - 18);
  }

  function drawTent(g, x, y, scale, theme) {
    const w = 30 * scale;
    const h = 24 * scale;
    g.fillStyle(0x000000, 0.18);
    g.fillEllipse(x + 2, y + 2, w + 8, 10);
    g.fillStyle(colour(theme, "tent"), 1);
    g.fillTriangle(x - w / 2, y + h / 2, x, y - h / 2, x + w / 2, y + h / 2);
    g.lineStyle(2, colour(theme, "campEdge"), 0.8);
    g.strokeTriangle(x - w / 2, y + h / 2, x, y - h / 2, x + w / 2, y + h / 2);
    g.fillStyle(colour(theme, "campEdge"), 0.7);
    g.fillTriangle(x - 4 * scale, y + h / 2, x, y, x + 4 * scale, y + h / 2);
  }

  function drawTree(g, item, theme) {
    const s = item.scale || 1;
    const x = item.x;
    const y = item.y;
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(x + 4 * s, y + 11 * s, 28 * s, 9 * s);
    g.fillStyle(colour(theme, "trunk"), 1);
    g.fillRect(x - 2 * s, y - 1 * s, 4 * s, 13 * s);
    g.fillStyle(colour(theme, "tree"), 1);
    g.fillCircle(x - 8 * s, y - 4 * s, 11 * s);
    g.fillCircle(x + 8 * s, y - 4 * s, 10 * s);
    g.fillCircle(x, y - 13 * s, 12 * s);
    g.fillStyle(colour(theme, "treeLight"), 1);
    g.fillCircle(x - 3 * s, y - 12 * s, 6 * s);
    g.fillCircle(x + 8 * s, y - 7 * s, 4.5 * s);
  }

  function drawRock(g, item, theme) {
    const s = item.scale || 1;
    const x = item.x;
    const y = item.y;
    g.fillStyle(0x000000, 0.18);
    g.fillEllipse(x + 3 * s, y + 7 * s, 28 * s, 9 * s);
    g.fillStyle(colour(theme, "rock"), 1);
    g.fillCircle(x - 6 * s, y, 9 * s);
    g.fillCircle(x + 5 * s, y - 2 * s, 10 * s);
    g.fillCircle(x, y + 5 * s, 8 * s);
    g.fillStyle(colour(theme, "rockLight"), 0.9);
    g.fillCircle(x + 4 * s, y - 5 * s, 4 * s);
  }

  function drawBush(g, item, theme) {
    const s = item.scale || 1;
    const x = item.x;
    const y = item.y;
    g.fillStyle(0x000000, 0.15);
    g.fillEllipse(x + 2 * s, y + 5 * s, 24 * s, 8 * s);
    g.fillStyle(colour(theme, "bush"), 1);
    g.fillCircle(x - 7 * s, y, 7 * s);
    g.fillCircle(x + 6 * s, y - 1 * s, 8 * s);
    g.fillCircle(x, y - 6 * s, 7 * s);
    g.fillStyle(colour(theme, "treeLight"), 0.7);
    g.fillCircle(x + 5 * s, y - 5 * s, 3 * s);
  }

  function drawPond(g, item, theme) {
    const s = item.scale || 1;
    const x = item.x;
    const y = item.y;
    g.fillStyle(colour(theme, "water"), 0.9);
    g.fillEllipse(x, y, 54 * s, 30 * s);
    g.fillStyle(colour(theme, "waterLight"), 0.7);
    g.fillEllipse(x - 4 * s, y - 2 * s, 38 * s, 18 * s);
    g.lineStyle(1, 0xffffff, 0.22);
    g.strokeEllipse(x, y, 54 * s, 30 * s);
  }

  function drawFlower(g, item, theme) {
    const s = item.scale || 1;
    const x = item.x;
    const y = item.y;
    g.lineStyle(1.5, colour(theme, "tree"), 0.9);
    g.lineBetween(x, y, x, y - 6 * s);
    g.fillStyle(colour(theme, "flower"), 1);
    g.fillCircle(x, y - 7 * s, 2.4 * s);
    g.fillCircle(x - 3 * s, y - 5 * s, 1.8 * s);
    g.fillCircle(x + 3 * s, y - 5 * s, 1.8 * s);
  }

  function drawScenery(scene, g, level, theme, baseDepth) {
    const items = level.scenery || [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.texture && scene.textures.exists(item.texture)) {
        scene.add.image(item.x, item.y, item.texture)
          .setDepth(baseDepth + 1)
          .setScale(item.scale || 1)
          .setRotation(item.rotation || 0);
        continue;
      }
      switch (item.type) {
        case "rock": drawRock(g, item, theme); break;
        case "bush": drawBush(g, item, theme); break;
        case "pond": drawPond(g, item, theme); break;
        case "flower": drawFlower(g, item, theme); break;
        case "tree":
        default: drawTree(g, item, theme); break;
      }
    }
  }

  function drawTreasure(scene, spot, theme, hideLabel) {
    const container = scene.add.container(spot.x, spot.y).setDepth(3);
    const glow = scene.add.circle(0, 0, 34, colour(theme, "gold"), 0.14);
    const g = scene.add.graphics();

    g.fillStyle(0x000000, 0.22);
    g.fillEllipse(3, 12, 54, 14);
    g.fillStyle(0x6a4322, 1);
    g.fillRoundedRect(-23, -14, 46, 30, 4);
    g.fillStyle(0x8b5a2b, 1);
    g.fillRoundedRect(-23, -18, 46, 12, 4);
    g.fillStyle(0xffd24d, 1);
    g.fillRect(-21, -6, 42, 4);
    g.fillRect(-3, -18, 6, 30);
    g.fillStyle(0xffef9e, 1);
    g.fillRect(-3, 2, 6, 7);
    g.lineStyle(2, 0x3a2414, 1);
    g.strokeRoundedRect(-23, -18, 46, 34, 4);

    container.add([glow, g]);
    if (!hideLabel) {
      const label = MB.ui.addText(scene, 0, 28, "TREASURE", {
        fontSize: "7px",
        color: "#ffd24d",
        stroke: "#000000",
        strokeThickness: 3
      }).setOrigin(0.5);
      container.add(label);
    }

    scene.tweens.add({
      targets: glow,
      alpha: 0.3,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    return container;
  }

  function drawDefense(scene, defense, theme) {
    const container = scene.add.container(defense.x, defense.y);
    const g = scene.add.graphics();
    const size = defense.size || 22;
    const enemy = colour(theme, "enemy");
    const enemyDark = colour(theme, "enemyDark");

    g.fillStyle(0x000000, 0.24);
    g.fillEllipse(3, 9, (size + 10) * 2, 12);

    if (defense.type === "ballista") {
      g.fillStyle(enemyDark, 1);
      g.fillCircle(0, 0, size + 3);
      g.fillStyle(0x8a5a32, 1);
      g.fillCircle(0, 0, size - 1);
      g.lineStyle(4, 0x4f351f, 1);
      g.lineBetween(-size + 4, -size * 0.75, size - 4, size * 0.75);
      g.lineBetween(-size + 4, size * 0.75, size - 4, -size * 0.75);
      g.lineStyle(3, 0xe6d2a8, 1);
      g.lineBetween(0, 0, size + 12, 0);
      g.fillStyle(0xe6d2a8, 1);
      g.fillTriangle(size + 12, 0, size + 4, -5, size + 4, 5);
      g.fillStyle(enemyDark, 1);
      g.fillCircle(0, 0, 6);
      g.lineStyle(2, 0x2e1c0e, 1);
      g.strokeCircle(0, 0, size + 3);
    } else {
      g.fillStyle(enemyDark, 1);
      g.fillCircle(0, 0, size + 3);
      g.fillStyle(enemy, 1);
      g.fillCircle(0, 0, size - 2);
      g.fillStyle(enemyDark, 1);
      g.fillRect(-size * 0.8, -size * 0.8, 8, 8);
      g.fillRect(size * 0.8 - 8, -size * 0.8, 8, 8);
      g.fillRect(-size * 0.8, size * 0.8 - 8, 8, 8);
      g.fillRect(size * 0.8 - 8, size * 0.8 - 8, 8, 8);
      g.fillStyle(0x2a1610, 1);
      g.fillCircle(0, 0, size * 0.4);
      g.fillStyle(colour(theme, "gold"), 0.9);
      g.fillCircle(0, 0, 3);
      g.lineStyle(2, 0x2e1c0e, 1);
      g.strokeCircle(0, 0, size + 3);
      g.lineStyle(2, colour(theme, "enemy"), 1);
      g.lineBetween(0, -size, 0, -size - 14);
      g.fillStyle(colour(theme, "enemy"), 1);
      g.fillTriangle(1, -size - 14, 16, -size - 9, 1, -size - 4);
    }

    container.add(g);
    container.setDepth(6);
    if (defense.scale) container.setScale(defense.scale);
    return container;
  }

  function drawUnit(scene, kind, def) {
    const container = scene.add.container(0, 0);
    const g = scene.add.graphics();
    const size = def.size;
    const color = def.color;
    const accent = def.accent;

    g.fillStyle(0x000000, 0.22);
    g.fillEllipse(2, size * 0.5, (size + 8) * 2, size * 0.7);

    g.fillStyle(0x1a1a1a, 1);
    g.fillCircle(0, 0, size + 2);
    g.fillStyle(color, 1);
    g.fillCircle(0, 0, size);
    g.fillStyle(accent, 1);
    g.fillCircle(-1, -1, size * 0.45);

    if (kind === "archer") {
      g.lineStyle(2, 0x3a2a18, 1);
      g.beginPath();
      g.arc(size * 0.65, 0, size * 0.9, -1.25, 1.25, false);
      g.strokePath();
      g.lineStyle(1.5, accent, 1);
      g.lineBetween(size * 0.65, -size * 0.85, size * 0.65, size * 0.85);
      g.lineStyle(2, 0xffe6a8, 1);
      g.lineBetween(size * 0.3, 0, size + 9, 0);
      g.fillStyle(0xffe6a8, 1);
      g.fillTriangle(size + 9, 0, size + 3, -3, size + 3, 3);
    } else {
      g.fillStyle(accent, 1);
      g.fillRect(size * 0.55, -size * 0.8, 5, size * 1.6);
      g.lineStyle(2, 0xd8c8a8, 1);
      g.lineBetween(size * 0.3, 0, size + 13, 0);
      g.fillStyle(0xd8c8a8, 1);
      g.fillTriangle(size + 13, 0, size + 7, -3, size + 7, 3);
    }

    container.add(g);
    return container;
  }

  function drawLabels(scene, level, theme) {
    const area = level.playerArea;
    const start = level.path[0];
    const startBottom = start.y > area.y + area.h / 2;
    const labelY = startBottom ? area.y + area.h - 13 : area.y + 13;
    MB.ui.addText(scene, area.x + area.w / 2, labelY, "YOUR CAMP", {
      fontSize: "7px",
      color: "#d8e8ff",
      stroke: "#000000",
      strokeThickness: 3
    }).setDepth(2);
  }

  function drawMap(scene, level, path, opts) {
    opts = opts || {};
    const theme = level.theme || {};
    const baseDepth = opts.depth || 0;
    const g = scene.add.graphics().setDepth(baseDepth);

    if (!opts.skipGround) drawGround(g, level, theme);
    drawCamp(g, level, theme);
    strokePath(
      g,
      path.points,
      level.pathWidth,
      colour(theme, "path"),
      colour(theme, "pathEdge")
    );
    drawScenery(scene, g, level, theme, baseDepth);
    if (!opts.menu) drawLabels(scene, level, theme);
    const treasure = drawTreasure(scene, level.treasure, theme, opts.menu);
    treasure.setDepth(baseDepth + 3);

    return { g: g, treasure: treasure };
  }

  function drawMiniMap(scene, level, cx, cy, w, h) {
    const theme = level.theme || {};
    const g = scene.add.graphics();
    const mapW = MB.config.WIDTH;
    const mapH = MB.config.HEIGHT;
    const pad = 7;
    const sx = (w - pad * 2) / mapW;
    const sy = (h - pad * 2) / mapH;
    const left = cx - w / 2 + pad;
    const top = cy - h / 2 + pad;

    function pt(p) {
      return { x: left + p.x * sx, y: top + p.y * sy };
    }

    g.fillStyle(colour(theme, "grassDark"), 1);
    g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 6);
    g.lineStyle(2, colour(theme, "campEdge"), 0.5);
    g.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, 6);

    const area = level.playerArea;
    const areaTopLeft = pt({ x: area.x, y: area.y });
    g.fillStyle(colour(theme, "camp"), 0.45);
    g.fillRect(areaTopLeft.x, areaTopLeft.y, area.w * sx, area.h * sy);

    g.lineStyle(4, colour(theme, "pathEdge"), 1);
    g.beginPath();
    const first = pt(level.path[0]);
    g.moveTo(first.x, first.y);
    for (let i = 1; i < level.path.length; i++) {
      const p = pt(level.path[i]);
      g.lineTo(p.x, p.y);
    }
    g.strokePath();

    g.lineStyle(2, colour(theme, "path"), 1);
    g.beginPath();
    g.moveTo(first.x, first.y);
    for (let i = 1; i < level.path.length; i++) {
      const p = pt(level.path[i]);
      g.lineTo(p.x, p.y);
    }
    g.strokePath();

    for (let i = 0; i < level.defenses.length; i++) {
      const d = pt(level.defenses[i]);
      g.fillStyle(colour(theme, "enemy"), 1);
      g.fillCircle(d.x, d.y, 2.5);
    }

    const t = pt(level.treasure);
    g.fillStyle(colour(theme, "gold"), 1);
    g.fillCircle(t.x, t.y, 4);
    return g;
  }

  function drawMenuBackdrop(scene, level) {
    const path = MB.path.build(level.path);
    const map = drawMap(scene, level, path, { menu: true, depth: -20 });
    scene.add.rectangle(MB.config.WIDTH / 2, MB.config.HEIGHT / 2, MB.config.WIDTH, MB.config.HEIGHT, 0x07120a, 0.62);
    return map;
  }

  return {
    drawMap: drawMap,
    drawMiniMap: drawMiniMap,
    drawMenuBackdrop: drawMenuBackdrop,
    drawDefense: drawDefense,
    drawUnit: drawUnit,
    rng: rng
  };
})();
