window.MB = window.MB || {};

// Small rendering helpers shared by scenes. Keep game-specific widgets out of
// here so this scaffold stays reusable.
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
    if (opts.wordWrap != null) style.wordWrap = { width: opts.wordWrap };
    return scene.add.text(x, y, label, style)
      .setOrigin(opts.origin != null ? opts.origin : 0.5);
  }

  function addStars(scene, count) {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * MB.config.WIDTH;
      const y = Math.random() * MB.config.HEIGHT;
      const size = Math.random() < 0.15 ? 2 : 1;
      const alpha = 0.3 + Math.random() * 0.7;
      const star = scene.add.circle(x, y, size, 0xffffff, alpha);
      stars.push({ g: star, x: x, y: y, speed: 0.1 + Math.random() * 0.5 });
    }
    return stars;
  }

  function updateStars(stars, dt) {
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.speed * dt * 0.02;
      if (s.x > MB.config.WIDTH + 5) s.x = -5;
      s.g.setPosition(s.x, s.y);
    }
  }

  return {
    addText: addText,
    addStars: addStars,
    updateStars: updateStars
  };
})();
