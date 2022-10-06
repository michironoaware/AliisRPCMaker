//TODO: Main should be the windows service, do a separate file for browserwindow,tray and etc.
//Learn svg for frame icons & other
import path from 'path';
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage, NativeImage } from 'electron';
import { Directory } from './Directory';
import { Settings } from './Settings';
import { Presences } from './Presences';
import { RPC } from './RPC';
import { Utils } from './Utils';

Directory.start(__dirname, [
	{
		'type': 'file',
		'id': 'settings.json',
		'content': JSON.stringify(Settings.dflt)
	},
	{
		'type': 'folder',
		'id': 'presences',
	},
]);

const discordIcon: NativeImage = nativeImage.createFromPath(path.join(__dirname, '../public/visual/discord0.ico')).resize({ 'width': 16 });
app.whenReady().then(() => {
	const window: BrowserWindow = new BrowserWindow({
		'minWidth': 800,
		'minHeight': 600,
		'frame': false,
		'fullscreenable': false,
		'icon': discordIcon,
		'webPreferences': {
			'preload': path.join(__dirname, 'preload.js'),
		},
	});
	window.loadFile(path.join(__dirname, '../public/views/index.html'));

	const tray: Tray = new Tray(discordIcon);
	tray.setToolTip('Discord RPC Maker');
	tray.on('click', () => window.show());
	tray.setContextMenu(Menu.buildFromTemplate([
		{
			'type': 'normal',
			'label': 'Discord RPC Maker',
			'enabled': false,
			'icon': discordIcon
		},
		{
			'type': 'normal',
			'label': 'Quit',
			'click': app.quit
		},
	]));

	ipcMain.handle('import:Directory', () => Directory);
	ipcMain.handle('import:Settings', () => Settings);
	ipcMain.handle('import:Presences', () => Presences);
	ipcMain.handle('import:RPC', () => RPC);
	ipcMain.handle('import:Utils', () => Utils);

	ipcMain.handle('window-minimize', () => window.minimize());
	ipcMain.handle('window-maximize', () => window.isMaximized() ? window.unmaximize() : window.maximize());
	ipcMain.handle('window-close', () => window.hide());

});

app.on('window-all-closed', app.quit);