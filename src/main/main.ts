import path from 'path';
import { app, ipcMain, BrowserWindow, Tray, Menu, nativeImage, NativeImage, IpcMainInvokeEvent, Task } from 'electron';
import { Directory } from './Directory.js';
import { Settings } from './Settings.js';
import { Presences } from './Presences.js';

Directory.init(path.join(__dirname, '../../'), [
	{
		type: 'folder',
		id: 'data',
		content: [
			{
				type: 'file',
				id: 'settings.json',
				content: JSON.stringify({})
			},
			{
				type: 'folder',
				id: 'presences',
			},
		]
	}
]);

var window: BrowserWindow;
const discordIcon: NativeImage = nativeImage.createFromPath(path.join(__dirname, '../assets/discord0.ico')).resize({ 'width': 16 });

app.whenReady().then(() => {
	window = new BrowserWindow({
		minWidth: 950,
		minHeight: 500,
		frame: false,
		center: true,
		fullscreenable: false,
		icon: discordIcon,
		show: !Settings.get().minimized,
		webPreferences: {
			devTools: false,
			webviewTag: true,
			contextIsolation: false,
			sandbox: false,
			nodeIntegration: true,
			nodeIntegrationInSubFrames: true,
		},
	});
	window.loadFile(path.join(__dirname, '../views/index.html'));

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

	//Overlay icon

	const handle: { [key: string]: (event: IpcMainInvokeEvent, ...args: any[]) => any } = {
		'window.minimize': (): void => window.minimize(),
		'window.maximize': (): void => window.isMaximized() ? window.unmaximize() : window.maximize(),
		'window.hide': (): void => window.hide(),
	};
	for(const key in handle) ipcMain.handle(key, handle[key]);
});

app.on('window-all-closed', app.quit);
app.on('activate', () => window.show);