import { SettingsData } from './types';
import fs from 'fs';
import path from 'path';

export class Settings {
	public static readonly path = path.join(__dirname, 'settings.bin');
	public static readonly default: SettingsData = {
		transport: 'ipc',
		startInBrackground: true,
		onStartup: true
	};;
	public static readonly options = {
		transport: ['ipc', 'websocket'],
		startInBackground: Boolean,
		onStartup: Boolean,
	};

	public static read(): SettingsData {
		return JSON.parse(fs.readFileSync(Settings.path, { encoding: 'utf8'})) as SettingsData;
	}
	public static write(settings: SettingsData): void {
		fs.writeFileSync(Settings.path, JSON.stringify(settings), { encoding: 'utf8' });
	}
}