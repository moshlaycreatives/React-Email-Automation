// // Disable no-unused-vars, broken for spread args
// /* eslint no-unused-vars: off */
// import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// export type Channels = 'ipc-example';

// const electronHandler = {
//   ipcRenderer: {
//     // async getBaseUrl() {
//     //   return await ipcRenderer.invoke('get-base-url');
//     // },
//     getSystemInfo() {
//       try {
//         return ipcRenderer.invoke('get-system-info');
//       } catch (error) {
//         console.log(error);
//         return null;
//       }
//     },
//     sendMessage(channel: Channels, ...args: unknown[]) {
//       ipcRenderer.send(channel, ...args);
//     },
//     on(channel: Channels, func: (...args: unknown[]) => void) {
//       const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
//         func(...args);
//       ipcRenderer.on(channel, subscription);

//       return () => {
//         ipcRenderer.removeListener(channel, subscription);
//       };
//     },
//     once(channel: Channels, func: (...args: unknown[]) => void) {
//       ipcRenderer.once(channel, (_event, ...args) => func(...args));
//     },
//   },
// };

// contextBridge.exposeInMainWorld('electron', electronHandler);

// export type ElectronHandler = typeof electronHandler;
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;
// export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    connect: async ({ googleUsername, googlePassword, token }) => {
      try {
        await ipcRenderer.invoke('connect', {
          googleUsername,
          googlePassword,
          token,
        });
        console.log(token, googlePassword, googleUsername, 'from preload');
      } catch (error) {
        console.log(error);
      }
    },
    startSession: async ({ googleUsername, googlePassword, token, id }) => {
      try {
        await ipcRenderer.invoke('start', {
          googleUsername,
          googlePassword,
          token,
          id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    sendEmail: async ({ recipientEmail, emailSubject, emailBody, id }) => {
      console.log(recipientEmail, emailSubject, emailBody, id);
      await ipcRenderer.invoke('send-email', {
        recipientEmail,
        emailSubject,
        emailBody,
        id,
      });
    },
    closeSession:async  ({ id }) => {
      await ipcRenderer.invoke('close', { id });
    },
    // emailAutomate(data) {
    //   const emailBatches = data?.emailBatches;
    //   const accounts = data?.accounts;
    //   const campaign = data?.campaign;
    //   const settings = data?.settings;
    //   // emailAutomation({ emailBatches, accounts, campaign, settings });
    // },
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    getSystemInfo() {
      return ipcRenderer.invoke('get-system-info');
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
