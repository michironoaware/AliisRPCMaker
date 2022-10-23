import { ipcRenderer } from 'electron';
import { RPC } from '../main/RPC';

document.getElementById('minimize')!.addEventListener('click', () => ipcRenderer.invoke('window.minimize'));
document.getElementById('maximize')!.addEventListener('click', () => ipcRenderer.invoke('window.maximize'));
document.getElementById('close')!.addEventListener('click', () => ipcRenderer.invoke(RPC.client ? 'window.hide' : 'app.quit'));