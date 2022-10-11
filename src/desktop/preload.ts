import { contextBridge, ipcRenderer } from 'electron';

const expose: { [key: string]: any } = {
	'windowMinimize': (): Promise<void> => ipcRenderer.invoke('Window:minimize'),
	'windowMaximize': (): Promise<void> => ipcRenderer.invoke('Window:maximize'),
	'windowClose': (): Promise<void> => ipcRenderer.invoke('Window:close'),
	'appQuit': (): Promise<void> => ipcRenderer.invoke('App:quit'),

	'settingsDflt': (): Promise<Object> => ipcRenderer.invoke('Settings:dflt'),
	'settingsGet': (): Promise<Object> => ipcRenderer.invoke('Settings:get'),
	'settingsSet': (data: Object): Promise<void> => ipcRenderer.invoke('Settings:set', data),
};

for(const key in expose) contextBridge.exposeInMainWorld(key, expose[key]);