window.MB = window.MB || {};

MB.Scenes = MB.Scenes || {};

MB.Scenes.Quiz = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function Quiz() {
    Phaser.Scene.call(this, { key: "Quiz" });
  },

  init: function (data) {
    this.levelScene = data && data.level;
  },

  create: function () {
    const C = MB.config;
    this.lock = false;
    this.awaitingCorrect = false;
    this.blinkTween = null;
    this.streak = 0;
    this.closed = false;
    MB.audio.unlock();

    this.add.rectangle(C.WIDTH / 2, C.HEIGHT / 2, C.WIDTH, C.HEIGHT, 0x030703, 0.84);

    MB.ui.addPanel(this, C.WIDTH / 2, 270, 780, 460, {
      fill: 0x0f1c10,
      alpha: 0.98,
      border: 0x8aa06a
    });

    MB.ui.addText(this, C.WIDTH / 2, 66, "GERMAN CHALLENGE", {
      fontSize: "18px",
      color: "#ffd24d"
    });
    MB.ui.addText(this, C.WIDTH / 2, 94, "Correct answers earn 1 supply for your army.", {
      fontSize: "8px",
      color: "#b9cbaa"
    });

    this.supplyText = MB.ui.addText(this, 150, 468, "SUPPLY: 0", {
      fontSize: "9px",
      color: "#ffd24d",
      origin: 0
    });
    this.streakText = MB.ui.addText(this, 360, 468, "STREAK: 0", {
      fontSize: "9px",
      color: "#8fd0ff",
      origin: 0
    });

    this.promptText = MB.ui.addText(this, C.WIDTH / 2, 152, "", {
      fontSize: "13px",
      color: "#ffffff",
      wordWrap: 650,
      lineSpacing: 12
    });

    this.feedbackText = MB.ui.addText(this, C.WIDTH / 2, 420, "", {
      fontSize: "9px",
      color: "#9fb894"
    });

    const positions = [[310, 290], [650, 290], [310, 370], [650, 370]];
    const fills = [0x2f5a3a, 0x2f4f5e, 0x2f5a3a, 0x2f4f5e];
    const overs = [0x3f7a4e, 0x3f6a82, 0x3f7a4e, 0x3f6a82];
    this.answers = [];

    positions.forEach(function (pos, i) {
      const button = MB.ui.addButton(this, pos[0], pos[1], 320, 64, "", {
        fill: fills[i],
        fillOver: overs[i],
        fontSize: "13px",
        onClick: function () {
          this.answer(button);
        }.bind(this)
      });
      this.answers.push(button);
    }, this);

    MB.ui.addButton(this, 760, 468, 190, 36, "BACK TO MAP", {
      fill: 0x6e3232,
      fillOver: 0x8d4444,
      fontSize: "8px",
      onClick: function () {
        MB.audio.click();
        this.close();
      }.bind(this)
    });

    this.loadQuestion();
  },

  updateHeader: function () {
    const supply = this.levelScene ? this.levelScene.supply : 0;
    this.supplyText.setText("SUPPLY: " + supply);
    this.streakText.setText("STREAK: " + this.streak);
    this.streakText.setColor(this.streak >= 3 ? "#ffd24d" : "#8fd0ff");
  },

  fitFont: function (text) {
    const length = String(text).length;
    if (length > 16) return 9;
    if (length > 10) return 11;
    return 13;
  },

  loadQuestion: function () {
    if (this.closed) return;
    this.stopBlink();
    this.lock = false;
    this.awaitingCorrect = false;
    this.question = MB.german.next();
    this.promptText.setText(this.question.prompt);

    this.answers.forEach(function (button, i) {
      const option = this.question.options[i];
      button.setVisible(option != null);
      if (option == null) return;
      MB.ui.setButtonLabel(button, option);
      MB.ui.setButtonFontSize(button, this.fitFont(option));
    }, this);

    this.feedbackText.setColor("#9fb894");
    this.feedbackText.setText("Choose the correct answer.");
    this.updateHeader();
  },

  answer: function (button) {
    if (this.lock || this.closed) return;
    const index = this.answers.indexOf(button);
    const chosen = this.question.options[index];
    if (chosen == null) return;

    if (this.awaitingCorrect) {
      if (chosen !== this.question.answer) {
        MB.audio.wrong();
        return;
      }
      MB.audio.correct();
      this.stopBlink();
      this.awaitingCorrect = false;
      this.feedbackText.setColor("#9fe08a");
      this.feedbackText.setText("Genau! Ready for the next one.");
      this.lock = true;
      this.time.delayedCall(800, this.loadQuestion, [], this);
      return;
    }

    this.lock = true;

    if (chosen === this.question.answer) {
      MB.audio.correct();
      this.streak++;
      if (this.levelScene) this.levelScene.addSupply(1);
      if (this.streak > 0 && this.streak % 5 === 0) {
        MB.audio.streak();
        this.feedbackText.setText("Correct! +1 supply. " + this.streak + " in a row!");
      } else {
        this.feedbackText.setText("Correct! +1 supply.");
      }
      this.feedbackText.setColor("#9fe08a");
      this.updateHeader();
      this.time.delayedCall(850, this.loadQuestion, [], this);
    } else {
      MB.audio.wrong();
      this.streak = 0;
      this.awaitingCorrect = true;
      this.lock = false;
      this.feedbackText.setColor("#ff8a7a");
      this.feedbackText.setText("Not quite. Click the correct answer.");
      this.updateHeader();
      this.blinkCorrect();
    }
  },

  blinkCorrect: function () {
    const index = this.question.options.indexOf(this.question.answer);
    if (index < 0) return;
    this.blinkTween = this.tweens.add({
      targets: this.answers[index],
      alpha: 0.2,
      duration: 110,
      yoyo: true,
      repeat: -1
    });
  },

  stopBlink: function () {
    if (this.blinkTween) {
      this.blinkTween.stop();
      this.blinkTween = null;
    }
    this.answers.forEach(function (button) { button.setAlpha(1); });
  },

  close: function () {
    if (this.closed) return;
    this.closed = true;
    this.stopBlink();
    if (this.levelScene) {
      this.levelScene.quizOpen = false;
      this.scene.resume("Level");
      this.levelScene.refreshHud();
    }
    this.scene.stop();
  }
});
