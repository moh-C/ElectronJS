// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { nativeImage, ipcRenderer } = require("electron");
const { writeFile } = require("fs");

let splashPath = `${__dirname}\\splash.png`;

let image = nativeImage.createFromPath(splashPath);

let desktopPath;
ipcRenderer.invoke("desktop-path").then((e) => {
  desktopPath = e;
});

let savePhoto = (imageBuffer, extention) => {
  writeFile(`${desktopPath}\\splash.${extention}`, imageBuffer, console.log);
};

document.getElementById("show-btn").addEventListener("click", (e) => {
  let desiredRatio =
    document.getElementById("show-splash-ratio").value / 100 || 0.25;
  let size = image.getSize();
  let imageURL = image
    .resize({
      width: Math.round(size.width * desiredRatio),
      height: Math.round(size.height * desiredRatio),
    })
    .toDataURL();
  document.getElementById("show-btn-src").src = imageURL;
});

document.getElementById("to-png-btn").addEventListener("click", () => {
  let imgPNG = image.toPNG();
  savePhoto(imgPNG, "png");
});

document.getElementById("to-jpg-btn").addEventListener("click", () => {
  let imgJPG = image.toPNG();
  savePhoto(imgJPG, "jpg");
});
