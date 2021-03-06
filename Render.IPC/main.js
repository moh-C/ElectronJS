// Modules
const { app, BrowserWindow, ipcMain } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

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

  mainWindow.webContents.on("did-finish-load", (e) => {
    mainWindow.webContents.send("mailbox", "You have new mail!");
  });

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

let counter = 1;

ipcMain.on("sync-channel", (e, args) => {
  console.log(args);
  setTimeout(() => {
    e.returnValue = "Response for the sync channel";
  }, 5000);
});

ipcMain.on("channel1", (e, args) => {
  console.log(args);
  e.sender.send("channel1_response", `Hello from ipcMain ${counter++}`);
});

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
