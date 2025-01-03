/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import os from 'node:os';
import { setTimeout } from 'node:timers/promises';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// import { fork } from 'child_process'; // To spawn the server as a child process

// const serverPath = app.isPackaged
//   ? path.join(process.resourcesPath, 'server/index.js')
//   : path.resolve(__dirname, '../../src/server/index.js');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
const sessionMap = {}
// const sessionMap = new Map();

// let serverProcess: any = null; // Reference for the server process

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// get system info
ipcMain.handle('get-system-info', async () => {
  try {
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
  } catch (error) {
    return {
      availableRAM: 0, // Convert to GB
      cpuCount: 0,
      maxChildWindows: 0,
    };
  }
});

ipcMain.handle(
  'connect',
  async (event, { token, googleUsername, googlePassword }) => {
    try {
      // console.log(token, googlePassword, googleUsername, 'main renderer');
      // if (token || googlePassword || googleUsername) return;
      // console.log(token, googlePassword, googleUsername);
      // const token = process.env.GL_API_TOKEN;
      const gologin = GologinApi({ token });

      const { browser } = await gologin.launch({ headless: false });

      const loginUrl =
        'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com&hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
      const page = await browser.newPage();

      const ua = await browser.userAgent();
      await page.setUserAgent(ua);

      // Navigate to the login page
      await page.goto(loginUrl, { waitUntil: 'networkidle2' });

      await page.waitForSelector('input[type="email"]', { timeout: 30000 });
      await page.type('input[type="email"]', googleUsername, { delay: 500 });
      await page.keyboard.press('Enter');

      // Wait for the password input field
      await page.waitForSelector('input[type="password"]', { timeout: 30000 });
      await setTimeout(10000);
      await page.type('input[type="password"]', googlePassword, { delay: 500 });
      await page.keyboard.press('Enter');
    } catch (error) {
      console.log(error);
    }
  },
);

ipcMain.handle(
  'start',
  async (event, { token, googleUsername, googlePassword, id }) => {
    console.log(id,'id form start')
    // console.log(token, googlePassword, googleUsername);
    // if (token || googlePassword || googleUsername || id) return;
    // const token = process.env.GL_API_TOKEN;
    const gologin = GologinApi({ token });

    const { browser } = await gologin.launch({ headless: false });

    const loginUrl =
      'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com&hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
    const page = await browser.newPage();

    const sessionData = { session: gologin, browser, page };
    sessionMap[id] = sessionData

    const ua = await browser.userAgent();
    await page.setUserAgent(ua);

    // Navigate to the login page
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    // Handle Recaptcha
    // await page.$eval(".trustworthy-status:not(.hide)", (elt) =>
    //   elt?.innerText?.trim()
    // );

    // Log in with email
    await page.waitForSelector('input[type="email"]', { timeout: 30000 });
    await page.type('input[type="email"]', googleUsername, { delay: 500 });
    await page.keyboard.press('Enter');

    // Wait for the password input field
    await page.waitForSelector('input[type="password"]', { timeout: 30000 });
    await setTimeout(10000);
    await page.type('input[type="password"]', googlePassword, { delay: 500 });
    await page.keyboard.press('Enter');

    // Wait for redirection to Gmail
    try {
      await page.waitForNavigation({
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // return { browser, page };
    } catch (error) {
      console.log('Login may require manual intervention.');
      // return { browser, page, session: gologin };
    }
  },
);

ipcMain.handle(
  'send-email',
  async (event, { recipientEmail, emailSubject, emailBody, id }) => {
    const sessionData = sessionMap[id]
    // console.log(first)
    const page = sessionData?.page;
    // if (!sessionData) return;
    try {
      await page.waitForSelector('.T-I.T-I-KE.L3', { timeout: 40000 }); // "Compose" button
      await page.click('.T-I.T-I-KE.L3');

      // Wait for the "To" input field and type recipient email
      await page.waitForSelector("input[type='text']", { timeout: 40000 });
      await page.type("input[type='text']", recipientEmail, { delay: 300 });

      // Type the email subject
      await page.type("input[name='subjectbox']", emailSubject, { delay: 300 });

      // Type the email body
      await page.click("div[aria-label='Message Body']");
      await page.type("div[aria-label='Message Body']", emailBody, {
        delay: 300,
      });

      await page.waitForSelector('div.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3', {
        timeout: 40000,
      });
      await page.click('div.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');
      console.log('Email sent successfully!');
    } catch (error) {
      console.log('Failed to send the email:', error);
    }
  },
);

ipcMain.handle('close', async (event, { id }) => {
  try {
    // const { browser } = session;
    const session = sessionMap[id];
    // if (!session) return;
    const browser = session?.browser;
    console.log('Closing session...');
    await browser?.close();
    console.log('Session closed.');
  } catch (error) {
    delete sessionMap[id];
    console.error('Error closing session:', error?.message);
  }
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

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
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

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // stopServer();
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // startServer(); // Start the server
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

/**
 * Graceful shutdown of server when app quits
 */
app.on('before-quit', () => {
  // stopServer();
});
