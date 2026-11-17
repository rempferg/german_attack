window.MB = window.MB || {};

(function () {
  "use strict";
  const C = MB.config;

  const config = {
    type: Phaser.AUTO,
    width: C.WIDTH,
    height: C.HEIGHT,
    parent: "game",
    backgroundColor: "#0a140c",
    fps: {
      // Keep simulation speed tied to real time on slow devices: Phaser's
      // focus-regain cooldown would otherwise run the game in slow motion
      // until it expires. Single deltas stay capped at 1/min fps.
      min: 5,
      target: 60,
      panicMax: 0
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      fullscreenTarget: "#game"
    },
    scene: [
      MB.Scenes.Menu,
      MB.Scenes.Levels,
      MB.Scenes.Level,
      MB.Scenes.Quiz
    ]
  };

  function refreshScale() {
    window.game.scale.refresh();
  }

  function boot() {
    window.game = new Phaser.Game(config);

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshScale, 150);
    });
    window.addEventListener("orientationchange", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshScale, 300);
    });

    var fsBtn = document.getElementById("fs-btn");
    if (!fsBtn) return;

    var el = document.documentElement;
    if (!(el.requestFullscreen || el.webkitRequestFullscreen)) {
      fsBtn.hidden = true;
      return;
    }

    fsBtn.addEventListener("click", function () {
      window.game.scale.toggleFullscreen();
    });
    window.game.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, function () {
      fsBtn.title = "Exit fullscreen";
    });
    window.game.scale.on(Phaser.Scale.Events.EXIT_FULLSCREEN, function () {
      fsBtn.title = "Fullscreen";
    });
  }

  // Wait for the pixel font before Phaser measures and renders any text.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(function () {
        return document.fonts.load('16px "Press Start 2P"');
      })
      .then(boot, boot);
  } else {
    boot();
  }
})();
