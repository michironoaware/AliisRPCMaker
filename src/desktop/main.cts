//TODO: Main should be the windows service, do a separate file for browserwindow,tray and etc.
//TODO: Learn svg for frame icons & other
//TODO: Auto-update with github.
import path from 'path';
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage, NativeImage, IpcMainInvokeEvent } from 'electron';
import { Directory } from './Directory.cjs';
import { Settings, SettingsData } from './Settings.cjs';
import { Presence, PresenceCreateOptions, Presences } from './Presences.cjs';

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
			preload: path.join(__dirname, 'preload.cjs'),
		},
		show: !Settings.get().minimized,
	});
	window.loadFile(path.join(__dirname, '../public/views/index.html'));

	const tray: Tray = new Tray(discordIcon);
	tray.setToolTip('Aliis RPC Maker');
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

	Directory.watch(path.join(__dirname, './presences/'), (t, p) => window.webContents.send('presencesUpdated', t, p));

	const handle: { [key: string]: (event: IpcMainInvokeEvent, ...args: any[]) => any } = {
		'Window:minimize': (): void => window.minimize(),
		'Window:maximize': (): void => window.isMaximized() ? window.unmaximize() : window.maximize(),
		'Window:close': (): void => window.hide(),
		'App:quit': (): void => app.quit(),

		'Settings:dflt': (): SettingsData => Settings.dflt,
		'Settings:get': (): SettingsData => Settings.get(),
		'Settings:set': (event, data: SettingsData): void => Settings.set(data),

		'Presences:getAll': (): Array<Presence> => Presences.getAll(),
		'Presences:get': (event, name: string): Presence => Presences.get(name),
		'Presences:exists': (event, name: string): boolean => Presences.exists(name),
		'Presences:create': (event, options: PresenceCreateOptions): Presence => Presences.create(options),
		'Presences:remove': (event, name: string): void => Presences.remove(name),
	};
	for(const key in handle) ipcMain.handle(key, handle[key]);
});

app.on('window-all-closed', app.quit);