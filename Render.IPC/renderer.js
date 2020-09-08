// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");

let counter = 1;
let i = 1;

setInterval(() => {
  console.log(i);
  i++;
}, 500);

document.getElementById("talk").addEventListener("click", (e) => {
  //   ipcRenderer.send("channel1", `Hello from ipcRendere ${counter++}`);
  let response = ipcRenderer.sendSync(
    "sync-channel",
    "Hello from sync channel via ipcrenderer"
  );
  console.log(response);
});

ipcRenderer.on("channel1_response", (e, args) => {
  console.log(args);
});

ipcRenderer.on("mailbox", (e, args) => {
  console.log(args);
});
