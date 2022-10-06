import fs from 'fs';
import nodePath from 'path';

export interface SettingsData {
	onStartup: boolean;
	startInBrackground: boolean;
	transport: 'ipc' | 'websocket';
}

export namespace Settings {
	export const path: string = nodePath.join(__dirname, 'settings.json');
	export const dflt: SettingsData = {
		'transport': 'ipc',
		'startInBrackground': true,
		'onStartup': true
	};
	export const options = {
		'transport': ['ipc', 'websocket'],
		'startInBackground': Boolean,
		'onStartup': Boolean,
	};

	export function read(): SettingsData {
		return JSON.parse(fs.readFileSync(Settings.path, { encoding: 'utf8'})) as SettingsData;
	}
	export function write(settings: SettingsData): void {
		fs.writeFileSync(Settings.path, JSON.stringify(settings), { encoding: 'utf8' });
	}
}