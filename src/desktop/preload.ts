import { contextBridge, ipcRenderer } from 'electron';

(async () => {
	const expose: { [key: string]: any } = {
		'Directory': async () => await ipcRenderer.invoke('import:Directory'),
		'Settings': async () => await ipcRenderer.invoke('import:Settings'),
		'Presences': async () => await ipcRenderer.invoke('import:Presences'),
		'RPC': async () => await ipcRenderer.invoke('import:RPC'),
		'Utils': async () => await ipcRenderer.invoke('import:Utils'),
		'windowMinimize': () => { ipcRenderer.invoke('window-minimize'); },
		'windowMaximize': () => { ipcRenderer.invoke('window-maximize'); },
		'windowClose': () => { ipcRenderer.invoke('window-close'); },
	};
	
	for(const k in expose) contextBridge.exposeInMainWorld(k, expose[k]);
})();