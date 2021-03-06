// Modules
const { app, BrowserWindow, Tray, Menu } = require("electron");
const nativeImage = require("electron").nativeImage;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray_;

let mainIcon = nativeImage.createFromPath("trayTemplate@2x/icon.png");

let trayMenu = Menu.buildFromTemplate([
  {
    label: "Click me for log",
    click: () => console.log("Clicked and here is the log"),
  },
  { type: "separator" },
  { role: "quit" },
]);

function createTray() {
  tray_ = new Tray(mainIcon);
  let tooltipMessage =
    "This is the tooltip\nHere we want to do a lot of new things\nLike your mom's name :)";
  tray_.setToolTip(tooltipMessage);

  // tray_.on("click", () => {
  //   mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  // });

  // tray_.on("click", () => {
  //   tray_.setContextMenu(trayMenu);
  // });

  tray_.setContextMenu(trayMenu);
}

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
app.on("ready", () => {
  createTray();
  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
