window.MB = window.MB || {};

MB.config = (function () {
  "use strict";

  const WIDTH = 960;
  const HEIGHT = 540;

  const FONT = '"Press Start 2P", "Courier New", monospace';

  // Appended to asset URLs by the Dockerfile. Bump it whenever js/, style.css
  // or fonts/ change, because those files are served with a one-year immutable
  // cache while index.html itself is never cached.
  const VERSION = "V1";

  return {
    WIDTH: WIDTH,
    HEIGHT: HEIGHT,
    FONT: FONT,
    TITLE: "German Attack",
    VERSION: VERSION
  };
})();
