window.MB = window.MB || {};

MB.save = (function () {
  "use strict";

  const KEY = "german-attack-save-v1";

  function defaults() {
    return {
      version: 1,
      levels: {}
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const data = JSON.parse(raw);
      const levels = {};
      if (data.levels && typeof data.levels === "object") {
        Object.keys(data.levels).forEach(function (id) {
          const rec = data.levels[id];
          if (rec && rec.completed) {
            levels[id] = {
              completed: true,
              completedAt: rec.completedAt || 0
            };
          }
        });
      }
      return { version: 1, levels: levels };
    } catch (e) {
      return defaults();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      // storage unavailable, ignore
    }
  }

  function clear() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      // ignore
    }
  }

  function isComplete(state, levelId) {
    return !!(state.levels[levelId] && state.levels[levelId].completed);
  }

  function completeLevel(levelId) {
    const state = load();
    const prev = state.levels[levelId] || {};
    state.levels[levelId] = {
      completed: true,
      completedAt: prev.completedAt || Date.now()
    };
    save(state);
    return state;
  }

  return {
    defaults: defaults,
    load: load,
    save: save,
    clear: clear,
    isComplete: isComplete,
    completeLevel: completeLevel
  };
})();
