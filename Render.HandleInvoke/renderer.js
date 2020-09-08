// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require("electron");

document.getElementById("main-app-fruit-ask").addEventListener("click", () => {
  //   ipcRenderer.send("ask-fruit");
  ipcRenderer.invoke("ask-fruit").then((answer) => {
    setTimeout(() => {
      document.getElementById("the-chosen-fruit").innerHTML = answer;
    }, 1000);
  });
});

// ipcRenderer.on("answer-fruit", (e, answer) => {
//   setTimeout(() => {
//     document.getElementById("the-chosen-fruit").innerHTML = answer;
//   }, 2000);
// });
