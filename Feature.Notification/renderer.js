// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require("electron");

setInterval(() => {
  let notification = new Notification("Electron App", {
    body: "Click on me for the Electron App Notification!",
  });
  ipcRenderer.invoke("mainWindow-status").then((isVisible) => {
    notification.onclick = (e) => {
      let status = isVisible ? true : false;
      ipcRenderer.send("mainWindow-show", status);
    };
  });
}, 5000);
