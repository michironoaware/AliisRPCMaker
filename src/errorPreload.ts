import { contextBridge } from 'electron';
import path from 'path';

const logPath =  path.join(__dirname, 'logs');
const errorPath = path.join(logPath, 'lastError.txt');

contextBridge.exposeInMainWorld('openLogFolder', () => {
	require('child_process').exec(`start "" "${logPath}"`);
});
contextBridge.exposeInMainWorld('errorPath', errorPath);