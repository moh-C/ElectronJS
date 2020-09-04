// Modules
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 300,
    minHeight: 150,
    webPreferences: { nodeIntegration: true },
  });

  secWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.setMenu(null);
  secWindow.setMenu(null);
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");
  secWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  secWindow.on("closed", () => {
    mainWindow.maximize();
  });

  mainWindow.on("blur", () => {
    console.log("Main win un-focused");
  });
  secWindow.on("focus", () => {
    console.log("Second win focused");
  });

  app.on("browser-window-focus", () => {
    console.log("App focused");
  });

  console.log(BrowserWindow.getAllWindows());

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  secWindow.on("closed", () => {
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
