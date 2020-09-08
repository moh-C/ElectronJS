// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { desktopCapturer } = require("electron");

desktopCapturer
  .getSources({
    types: ["screen"],
    thumbnailSize: { width: 1920, height: 1080 },
  })
  .then((sources) => {
    document.getElementById("takeScreenshot").addEventListener("click", () => {
      document.getElementById(
        "screenshot"
      ).src = sources[0].thumbnail.toDataURL();
    });
  });
