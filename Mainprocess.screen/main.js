// Modules
const { app, BrowserWindow, screen } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let primaryDisplay = screen.getPrimaryDisplay();

  console.log(primaryDisplay);

  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: primaryDisplay.bounds.width,
    height: primaryDisplay.bounds.height,
    webPreferences: { nodeIntegration: true },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // setInterval(() => {
  //   console.log(screen.getCursorScreenPoint());
  // }, 100);

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
