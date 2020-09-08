// Modules
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { realpathSync } = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let askFruit = async () => {
  let fruits = ["Apple", "Grape", "Orange"];
  let fruit = await dialog.showMessageBox(mainWindow, {
    message: "Please choose your desired fruit",
    buttons: fruits,
  });
  return fruits[fruit.response];
};

// ipcMain.on("ask-fruit", (e) => {
//   askFruit().then((answer) => {
//     e.reply("answer-fruit", answer);
//   });
// });

ipcMain.handle("ask-fruit", (e) => {
  return askFruit();
});

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
