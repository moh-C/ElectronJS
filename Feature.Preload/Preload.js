const { writeFile } = require("fs");
const { app } = require("electron");

window.fileWriter = (text) => {
  writeFile(`C:\\Users\\moham\\Desktop\\electronText.txt`, text, console.log);
};

window.versions = {
  node: process.versions.node,
  electron: process.versions.electron,
};
