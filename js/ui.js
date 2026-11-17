window.MB = window.MB || {};

MB.sceneGo = function (scene, key, data) {
  const sm = scene.scene.manager;
  if (scene.scene.key === key) {
    scene.scene.restart(data);
    return;
  }
  const all = sm.getScenes(true).slice();
  for (let i = 0; i < all.length; i++) {
    const s = all[i];
    if (s.scene.key !== key) sm.stop(s.scene.key);
  }
  sm.start(key, data);
};

// Shared pixel-art UI helpers. Gameplay art lives in js/art.js; levels live in
// js/levels/.
MB.ui = (function () {
  "use strict";

  function addText(scene, x, y, label, opts) {
    opts = opts || {};
    const style = {
      fontFamily: MB.config.FONT,
      fontSize: opts.fontSize || "16px",
      color: opts.color || "#ffffff",
      align: opts.align || "center"
    };
    if (opts.fontStyle != null) style.fontStyle = opts.fontStyle;
    if (opts.stroke != null) style.stroke = opts.stroke;
    if (opts.strokeThickness != null) style.strokeThickness = opts.strokeThickness;
    if (opts.lineSpacing != null) style.lineSpacing = opts.lineSpacing;
    if (opts.wordWrap != null) style.wordWrap = { width: opts.wordWrap };
    return scene.add.text(x, y, label, style)
      .setOrigin(opts.origin != null ? opts.origin : 0.5);
  }

  function addButton(scene, x, y, w, h, label, opts) {
    opts = opts || {};
    const container = scene.add.container(x, y);
    const bg = scene.add.graphics();
    const fill = opts.fill != null ? opts.fill : 0x2a5ab0;
    const fillOver = opts.fillOver != null ? opts.fillOver : 0x3f7de0;
    const border = opts.border != null ? opts.border : 0xffffff;

    function paint(color) {
      bg.clear();
      bg.fillStyle(color, 1);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 10);
      bg.lineStyle(3, border, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 10);
    }

    paint(fill);

    const text = scene.add.text(0, 0, label, {
      fontFamily: MB.config.FONT,
      fontSize: opts.fontSize || "18px",
      color: opts.textColor || "#ffffff",
      align: "center",
      lineSpacing: opts.lineSpacing != null ? opts.lineSpacing : 0,
      wordWrap: { width: w - 12 }
    }).setOrigin(0.5);

    const hit = scene.add.rectangle(0, 0, w, h, 0xffffff, 0.001);
    hit.setInteractive({ useHandCursor: true });
    hit.on("pointerover", function () { paint(container._over); });
    hit.on("pointerout", function () { paint(container._fill); });
    hit.on("pointerdown", function () {
      if (opts.onClick) opts.onClick();
    });

    container.add([bg, text, hit]);
    container._w = w;
    container._h = h;
    container._fill = fill;
    container._over = fillOver;
    container._paint = paint;
    return container;
  }

  function setButtonLabel(button, label) {
    button.list[1].setText(label);
  }

  function setButtonFontSize(button, size) {
    button.list[1].setFontSize(size);
  }

  function setButtonStyle(button, fill, over) {
    button._fill = fill;
    button._over = over;
    button._paint(fill);
  }

  function addPanel(scene, x, y, w, h, opts) {
    opts = opts || {};
    const g = scene.add.graphics();
    g.fillStyle(opts.fill != null ? opts.fill : 0x142013, opts.alpha != null ? opts.alpha : 0.94);
    g.fillRoundedRect(-w / 2, -h / 2, w, h, 14);
    g.lineStyle(3, opts.border != null ? opts.border : 0x88a06a, 1);
    g.strokeRoundedRect(-w / 2, -h / 2, w, h, 14);
    return scene.add.container(x, y).add(g);
  }

  function addHpBar(scene, x, y, w, h, opts) {
    opts = opts || {};
    const depth = opts.depth == null ? 0 : opts.depth;
    const color = opts.color == null ? 0x6ad06a : opts.color;
    const bg = scene.add.rectangle(x, y, w, h, 0x1c1010, 0.8).setDepth(depth);
    const fill = scene.add.rectangle(x - w / 2, y, w, h, color, 1)
      .setOrigin(0, 0.5)
      .setDepth(depth + 0.1);

    const bar = {
      setPosition: function (px, py) {
        bg.setPosition(px, py);
        fill.setPosition(px - w / 2, py);
        return bar;
      },
      setRatio: function (ratio) {
        const clamped = Math.max(0, Math.min(1, ratio));
        fill.setVisible(clamped > 0.001);
        fill.setDisplaySize(Math.max(0.001, w * clamped), h);
        return bar;
      },
      setAlpha: function (alpha) {
        bg.setAlpha(alpha);
        fill.setAlpha(alpha);
        return bar;
      },
      setDepth: function (d) {
        bg.setDepth(d);
        fill.setDepth(d + 0.1);
        return bar;
      },
      destroy: function () {
        bg.destroy();
        fill.destroy();
      }
    };
    bar.setRatio(1);
    return bar;
  }

  return {
    addText: addText,
    addButton: addButton,
    setButtonLabel: setButtonLabel,
    setButtonFontSize: setButtonFontSize,
    setButtonStyle: setButtonStyle,
    addPanel: addPanel,
    addHpBar: addHpBar
  };
})();
