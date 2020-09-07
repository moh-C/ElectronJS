// Modules
const { app, BrowserWindow, dialog } = require("electron");
const nativeImage = require("electron").nativeImage;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const nativeImage_ = nativeImage.createFromPath("splash.png");

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    // dialog
    //   .showOpenDialog(mainWindow, {
    //     buttonLabel: "Some name",
    //     defaultPath: app.getPath("desktop"),
    //     properties: ["showHiddenFiles", "multiSelections", "openFile"],
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   });

    // dialog.showSaveDialog({}).then((e) => {
    //   console.log(e);
    // });

    dialog
      .showMessageBox({
        type: "warning",
      })
      .then((e) => console.log(e));
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

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
