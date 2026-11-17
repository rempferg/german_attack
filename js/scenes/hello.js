window.MB = window.MB || {};

MB.Scenes = MB.Scenes || {};

MB.Scenes.Hello = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function Hello() {
    Phaser.Scene.call(this, { key: "Hello" });
  },

  create: function () {
    const C = MB.config;
    this.stars = MB.ui.addStars(this, 90);

    MB.ui.addText(this, C.WIDTH / 2, 190, "HELLO WORLD", {
      fontSize: "44px",
      color: "#66c8ff",
      fontStyle: "bold",
      stroke: "#66c8ff",
      strokeThickness: 2
    });

    MB.ui.addText(this, C.WIDTH / 2, 258, C.TITLE.toUpperCase(), {
      fontSize: "18px",
      color: "#ffd24d"
    });

    MB.ui.addText(this, C.WIDTH / 2, 310, "The game engine is up and running.", {
      fontSize: "11px",
      color: "#aabbee"
    });

    const hint = MB.ui.addText(this, C.WIDTH / 2, 368, "More to come \u2726", {
      fontSize: "10px",
      color: "#88aadd"
    });
    this.tweens.add({
      targets: hint,
      alpha: 0.25,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    MB.ui.addText(this, C.WIDTH - 12, 16, C.VERSION, {
      fontSize: "13px",
      color: "#6677aa",
      origin: 1
    });

    MB.ui.addText(this, C.WIDTH / 2, C.HEIGHT - 26, "Phaser 3", {
      fontSize: "8px",
      color: "#6677aa"
    });
  },

  update: function (_time, dt) {
    MB.ui.updateStars(this.stars, dt);
  }
});
