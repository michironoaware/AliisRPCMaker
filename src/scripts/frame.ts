import { ipcRenderer } from 'electron';

document.getElementById('minimize')!.addEventListener('click', () => ipcRenderer.invoke('window.minimize'));
document.getElementById('maximize')!.addEventListener('click', () => ipcRenderer.invoke('window.maximize'));
document.getElementById('close')!.addEventListener('click', () => ipcRenderer.invoke('window.hide'));