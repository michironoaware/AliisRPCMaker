import { BrowserWindow } from 'electron';
import path from 'path';

export default function newErrorWindow(): BrowserWindow {
	const window: BrowserWindow = new BrowserWindow({
		minWidth: 400,
		minHeight: 300,
		frame: false,
		resizable: false,
		fullscreenable: false,
		icon: path.join(__dirname, './visual/discord2.png'),
		webPreferences: {
			preload: path.join(__dirname, '/errorPreload.js'),
		},
	});
	window.setMenuBarVisibility(false);
	window.loadFile(path.join(__dirname, '/views/error.html'));

	return window;
}