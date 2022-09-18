import path from 'path';
import fs from 'fs';
import os from 'os';
import { app, BrowserWindow, Tray, Menu } from 'electron';
import { startDirectory } from './startDirectory';
import { SettingsData } from './types';

//TODO: Main should be the windows service, do a separate file for browserwindow,tray and etc.
startDirectory([
	{
		type: 'file',
		id: 'settings.bin',
		content: JSON.stringify({} as SettingsData)
	},
	{
		type: 'folder',
		id: 'presences',
	},
	{
		type: 'folder',
		id: 'logs',
	}
], __dirname);

/*
const __username: string = os.userInfo().username;
let discordDetected: boolean = false;
if(!(fs.existsSync(path.normalize(`C:/Users/${__username}/AppData/Local/Discord/Update.exe`))
|| fs.existsSync(path.normalize(`C:/Users/${__username}/AppData/Local/DiscordPTB/Update.exe`))
|| fs.existsSync(path.normalize(`C:/Users/${__username}/AppData/Local/DiscordCanary/Update.exe`))
)) {
	discordDetected = true;
}
*/

const discordIcon: string = path.join(__dirname, './visual/discord2.png');

function createWindow() {

};

app.whenReady().then(() => {
	const window: BrowserWindow = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		frame: false,
		fullscreenable: false,
		icon: discordIcon,
		webPreferences: {
			preload: path.join(__dirname, '/preload.js'),
		},
	});
	window.loadFile(path.join(__dirname, '/views/home.html'));

	const tray: Tray = new Tray(discordIcon);
	tray.on('click', () => {
		window.isVisible() ? window.hide() : window.show();
	});
});

app.on('window-all-closed', () => {
	;
});