var path = require("path"),
    Canvas = require("canvas"),
    getRenderer = require("../renderer/");

// Settings
var serverSettings = require("../lib/settings/");

function initializeCanvas(theme, cb) {

  // Fonts pre-registered in bin/worker
  var renderer = getRenderer(theme);

  // Load BBC watermark
  var dog = new Canvas.Image;
  var dogName = theme.dog || 'bbc';
  dog.src = path.join(serverSettings.storagePath, `../editor/images/${dogName}.png`);
  renderer.bbcDog(dog);

  // Load foreground image
  if (theme.customForegroundPath || theme.foregroundImage) {
    var fg = new Canvas.Image;
    if (!theme.customForegroundPath) {
      fg.src = path.join(__dirname, "..", "settings", "backgrounds", theme.foregroundImage);
    } else {
      fg.src = path.join(serverSettings.storagePath, theme.customForegroundPath);
    }
    renderer.foregroundImage(fg);
  }
  
  // Load background image
  var bg = new Canvas.Image;
  if (!theme.customBackgroundPath && theme.backgroundImage) {
    bg.src = path.join(__dirname, "..", "settings", "backgrounds", theme.backgroundImage);
  } else if (serverSettings.storagePath && theme.customBackgroundPath) {
    bg.src = path.join(serverSettings.storagePath, theme.customBackgroundPath);
  } else {
    // return cb('Missing background image');
  }
  if (!theme.noBackground && bg.src) {
    renderer.backgroundImage(bg);
  }

  return cb(null, renderer);


}

module.exports = initializeCanvas;
