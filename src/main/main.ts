// /* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
// import path from 'path';
// import { app, BrowserWindow, shell, ipcMain } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import log from 'electron-log';
// import MenuBuilder from './menu';
// import { resolveHtmlPath } from './util';
// import os from 'node:os';
// // import osUtils from "os-utils"

// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

// let mainWindow: BrowserWindow | null = null;

// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

// if (process.env.NODE_ENV === 'production') {
//   const sourceMapSupport = require('source-map-support');
//   sourceMapSupport.install();
// }

// const isDebug =
//   process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// if (isDebug) {
//   require('electron-debug')();
// }

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS'];

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload,
//     )
//     .catch(console.log);
// };

// //

// const createWindow = async () => {
//   if (isDebug) {
//     await installExtensions();
//   }

//   const RESOURCES_PATH = app.isPackaged
//     ? path.join(process.resourcesPath, 'assets')
//     : path.join(__dirname, '../../assets');

//   const getAssetPath = (...paths: string[]): string => {
//     return path.join(RESOURCES_PATH, ...paths);
//   };

//   mainWindow = new BrowserWindow({
//     show: false,
//     width: 1024,
//     height: 728,
//     icon: getAssetPath('thunder-mail-logo.png'),
//     webPreferences: {
//       preload: app.isPackaged
//         ? path.join(__dirname, 'preload.js')
//         : path.join(__dirname, '../../.erb/dll/preload.js'),
//     },
//   });

//   mainWindow.loadURL(resolveHtmlPath('index.html'));

//   mainWindow.on('ready-to-show', () => {
//     if (!mainWindow) {
//       throw new Error('"mainWindow" is not defined');
//     }
//     if (process.env.START_MINIMIZED) {
//       mainWindow.minimize();
//     } else {
//       mainWindow.show();
//     }
//   });

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });

//   const menuBuilder = new MenuBuilder(mainWindow);
//   menuBuilder.buildMenu();

//   // Open urls in the user's browser
//   mainWindow.webContents.setWindowOpenHandler((edata) => {
//     shell.openExternal(edata.url);
//     return { action: 'deny' };
//   });

//   // Remove this if your app does not use auto updates
//   // eslint-disable-next-line
//   new AppUpdater();
// };

// /**
//  * Add event listeners...
//  */

// app.on('window-all-closed', () => {
//   // Respect the OSX convention of having the application in memory even
//   // after all windows have been closed
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app
//   .whenReady()
//   .then(() => {
//     ipcMain.on('create-window', function (event, arg) {
//       debugger;
//       console.log(arg, 'args from main');
//       const [input] = arg;
//       const numberOfWindows = input.max_browser_automation;
//       for (let i = 0; i < numberOfWindows; i++) {
//         let child = new BrowserWindow();
//         // let child = new BrowserWindow({
//         //   show: false,
//         //   width: 300,
//         //   height: 300,
//         //   title: i + 'title',
//         //   parent: mainWindow,
//         // });
//         child.loadURL('https://google.com');
//       }
//     });

//     // Handle CPU and RAM requests from the renderer process
//     ipcMain.handle('get-system-info', async () => {
//       const availableRAM = os.freemem(); // Free memory in bytes
//       const estimatedWindowMemory = 150 * 1024 * 1024; // Estimate each window uses ~150MB
//       const maxWindowsByRAM = Math.floor(availableRAM / estimatedWindowMemory);

//       const cpus = os.cpus();
//       const maxWindowsByCPU = cpus.length; // Use 1 renderer per CPU core

//       // Final estimate
//       const maxChildWindows = Math.min(maxWindowsByRAM, maxWindowsByCPU);

//       return {
//         availableRAM: (availableRAM / (1024 * 1024 * 1024)).toFixed(2), // Convert to GB
//         cpuCount: cpus.length,
//         maxChildWindows,
//       };
//     });

//     createWindow();
//     app.on('activate', () => {
//       // On macOS it's common to re-create a window in the app when the
//       // dock icon is clicked and there are no other windows open.
//       if (mainWindow === null) createWindow();
//     });
//   })
//   .catch(console.log);

import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import os from 'node:os';
import { fork } from 'child_process'; // To spawn the server as a child process

// Path to your Node server file
// const serverPath = path.isAbsolute(__dirname+"/server");
// const serverPath = path.resolve("C:/Users/3 Stars Laptop/Documents/GitHub/React-Email-Automation/src/server/index.js");
const serverPath = app.isPackaged
  ? path.join(process.resourcesPath, 'server/index.js')
  : path.resolve(__dirname, '../../src/server/index.js');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;
let serverProcess = null; // Reference for the server process

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths) => path.join(RESOURCES_PATH, ...paths);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('thunder-mail-logo.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open URLs in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Auto updates
  new AppUpdater();
};

/**
 * Start the Node.js server as a child process
 */
const startServer = () => {
  debugger;
  console.log('Starting server...');
  serverProcess = fork(serverPath);

  serverProcess.on('message', (message) => {
    console.log('Server message:', message);
  });

  serverProcess.on('error', (error) => {
    console.error('Error in server process:', error);
  });

  serverProcess.on('exit', (code) => {
    console.log(`Server process exited with code: ${code}`);
  });
};

/**
 * Stop the Node.js server
 */
const stopServer = () => {
  if (serverProcess) {
    console.log('Stopping server...');
    serverProcess.kill();
    serverProcess = null;
  }
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopServer();
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    startServer(); // Start the server

    //     // Handle CPU and RAM requests from the renderer process
    ipcMain.handle('get-system-info', async () => {
      const availableRAM = os.freemem(); // Free memory in bytes
      const estimatedWindowMemory = 150 * 1024 * 1024; // Estimate each window uses ~150MB
      const maxWindowsByRAM = Math.floor(availableRAM / estimatedWindowMemory);

      const cpus = os.cpus();
      const maxWindowsByCPU = cpus.length; // Use 1 renderer per CPU core

      // Final estimate
      const maxChildWindows = Math.min(maxWindowsByRAM, maxWindowsByCPU);

      return {
        availableRAM: (availableRAM / (1024 * 1024 * 1024)).toFixed(2), // Convert to GB
        cpuCount: cpus.length,
        maxChildWindows,
      };
    });

    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

/**
 * Graceful shutdown of server when app quits
 */
app.on('before-quit', () => {
  stopServer();
});
