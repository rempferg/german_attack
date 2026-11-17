window.MB = window.MB || {};

// German question bank. Questions are generated once from small data tables and
// served from a shuffled deck, so a level can ask as many as the player wants
// without repeating until the deck runs out.
MB.german = (function () {
  "use strict";

  const VOCAB = [
    ["das Haus", "house"], ["der Baum", "tree"], ["das Buch", "book"],
    ["das Wasser", "water"], ["das Brot", "bread"], ["die Milch", "milk"],
    ["die Schule", "school"], ["der Freund", "friend"], ["die Stadt", "city"],
    ["das Land", "country"], ["die Straße", "street"], ["das Fenster", "window"],
    ["der Tisch", "table"], ["der Stuhl", "chair"], ["der Garten", "garden"],
    ["die Blume", "flower"], ["der Vogel", "bird"], ["der Fisch", "fish"],
    ["der Hund", "dog"], ["die Katze", "cat"], ["die Sonne", "sun"],
    ["der Mond", "moon"], ["die Nacht", "night"], ["der Morgen", "morning"],
    ["die Hand", "hand"], ["der Kopf", "head"], ["das Auge", "eye"],
    ["das Herz", "heart"], ["die Zeit", "time"], ["das Jahr", "year"]
  ];

  const ARTICLES = [
    ["Apfel", "der"], ["Baum", "der"], ["Tisch", "der"], ["Stuhl", "der"],
    ["Garten", "der"], ["Vogel", "der"], ["Hund", "der"], ["Kopf", "der"],
    ["Mond", "der"], ["Morgen", "der"],
    ["Schule", "die"], ["Stadt", "die"], ["Straße", "die"], ["Blume", "die"],
    ["Sonne", "die"], ["Nacht", "die"], ["Hand", "die"], ["Zeit", "die"],
    ["Jahr", "das"], ["Haus", "das"], ["Buch", "das"], ["Wasser", "das"],
    ["Brot", "das"], ["Fenster", "das"], ["Herz", "das"], ["Kind", "das"],
    ["Mädchen", "das"], ["Auto", "das"], ["Fahrrad", "das"], ["Land", "das"]
  ];

  const PLURALS = [
    ["Kind", "Kinder"], ["Haus", "Häuser"], ["Buch", "Bücher"],
    ["Baum", "Bäume"], ["Apfel", "Äpfel"], ["Stadt", "Städte"],
    ["Blume", "Blumen"], ["Vogel", "Vögel"], ["Hund", "Hunde"],
    ["Katze", "Katzen"], ["Jahr", "Jahre"], ["Tisch", "Tische"],
    ["Stuhl", "Stühle"], ["Fenster", "Fenster"], ["Auto", "Autos"],
    ["Fahrrad", "Fahrräder"], ["Mädchen", "Mädchen"], ["Freund", "Freunde"],
    ["Hand", "Hände"], ["Kopf", "Köpfe"]
  ];

  const VERBS = [
    { verb: "sein", forms: ["bin", "bist", "ist", "sind", "seid", "sind"] },
    { verb: "haben", forms: ["habe", "hast", "hat", "haben", "habt", "haben"] },
    { verb: "gehen", forms: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"] },
    { verb: "machen", forms: ["mache", "machst", "macht", "machen", "macht", "machen"] },
    { verb: "sprechen", forms: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"] }
  ];

  const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

  const CASES = [
    ["mit", "Dative"], ["für", "Accusative"], ["ohne", "Accusative"],
    ["durch", "Accusative"], ["gegen", "Accusative"], ["um", "Accusative"],
    ["entlang", "Accusative"], ["nach", "Dative"], ["aus", "Dative"],
    ["von", "Dative"], ["bei", "Dative"], ["seit", "Dative"]
  ];

  const CASE_NAMES = ["Nominative", "Accusative", "Dative", "Genitive"];

  function shuffle(items) {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function uniqueOptions(correct, candidates) {
    const out = [correct];
    const pool = shuffle(candidates);
    for (let i = 0; i < pool.length && out.length < 4; i++) {
      if (out.indexOf(pool[i]) === -1) out.push(pool[i]);
    }
    return shuffle(out);
  }

  const POOL = [];

  function addQuestion(prompt, answer, options) {
    if (!prompt || !answer || options.length < 3) return;
    POOL.push({ prompt: prompt, answer: answer, options: options });
  }

  VOCAB.forEach(function (entry) {
    const german = entry[0];
    const english = entry[1];
    const englishWords = VOCAB.map(function (v) { return v[1]; });
    const germanWords = VOCAB.map(function (v) { return v[0]; });
    addQuestion(
      'What is "' + german + '" in English?',
      english,
      uniqueOptions(english, englishWords)
    );
    addQuestion(
      'Which German word means "' + english + '"?',
      german,
      uniqueOptions(german, germanWords)
    );
  });

  ARTICLES.forEach(function (entry) {
    addQuestion(
      'Which definite article (nominative) fits "___ ' + entry[0] + '"?',
      entry[1],
      uniqueOptions(entry[1], ["der", "die", "das", "den"])
    );
  });

  PLURALS.forEach(function (entry) {
    addQuestion(
      'What is the plural of "' + entry[0] + '"?',
      entry[1],
      uniqueOptions(entry[1], PLURALS.map(function (p) { return p[1]; }))
    );
  });

  VERBS.forEach(function (verb) {
    PRONOUNS.forEach(function (pronoun, i) {
      const answer = verb.forms[i];
      addQuestion(
        'Which form of "' + verb.verb + '" fits "' + pronoun + '"?',
        answer,
        uniqueOptions(answer, verb.forms)
      );
    });
  });

  CASES.forEach(function (entry) {
    addQuestion(
      'Which case does the preposition "' + entry[0] + '" require?',
      entry[1],
      uniqueOptions(entry[1], CASE_NAMES)
    );
  });

  let deck = [];

  function next() {
    if (!deck.length) deck = shuffle(POOL);
    const question = deck.pop();
    return {
      prompt: question.prompt,
      answer: question.answer,
      options: shuffle(question.options)
    };
  }

  function reset() {
    deck = [];
  }

  return {
    next: next,
    reset: reset,
    count: POOL.length
  };
})();
