// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let counter = 1;

const { ipcRenderer } = require("electron");
document.getElementById("talk").addEventListener("click", (e) => {
  ipcRenderer.send("channel1", `Hello from ipcRendere ${counter++}`);
});

ipcRenderer.on("channel1_response", (e, args) => {
  console.log(args);
});
