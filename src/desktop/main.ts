//TODO: Main should be the windows service, do a separate file for browserwindow,tray and etc.
//Learn svg for frame icons & other
import path from 'path';
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage, NativeImage } from 'electron';
import { Directory } from './Directory';
import { Settings, SettingsData } from './Settings';
import { Presences } from './Presences';
import { RPC } from './RPC';
import { Utils } from './Utils';

Directory.init(__dirname, [
	{
		type: 'file',
		id: 'settings.json',
		content: JSON.stringify(Settings.dflt)
	},
	{
		type: 'folder',
		id: 'presences',
	},
]);

const discordIcon: NativeImage = nativeImage.createFromPath(path.join(__dirname, '../public/visual/discord0.ico')).resize({ 'width': 16 });
app.whenReady().then(() => {
	const window: BrowserWindow = new BrowserWindow({
		minWidth: 950,
		minHeight: 500,
		frame: false,
		fullscreenable: false,
		icon: discordIcon,
		webPreferences: {
			contextIsolation: true,
			sandbox: true,
			preload: path.join(__dirname, 'preload.js'),
		},
		show: !Settings.get().minimized,
	});
	window.loadFile(path.join(__dirname, '../public/views/index.html'));

	const tray: Tray = new Tray(discordIcon);
	tray.setToolTip('Discord RPC Maker');
	tray.on('click', () => window.show());
	tray.setContextMenu(Menu.buildFromTemplate([
		{
			type: 'normal',
			label: 'Aliis RPC Maker',
			enabled: false,
			icon: discordIcon
		},
		{
			type: 'normal',
			label: 'Quit',
			click: app.quit
		},
	]));
	
	ipcMain.handle('Window:minimize', (): void => window.minimize());
	ipcMain.handle('Window:maximize', (): void => window.isMaximized() ? window.unmaximize() : window.maximize());
	ipcMain.handle('Window:close', (): void => window.hide());
	ipcMain.handle('App:quit', (): void => app.quit());

	ipcMain.handle('Settings:dflt', (): SettingsData => Settings.dflt);
	ipcMain.handle('Settings:get', (): SettingsData => Settings.get());
	ipcMain.handle('Settings:set', (event, data: SettingsData): void => Settings.set(data));
});

app.on('window-all-closed', app.quit);