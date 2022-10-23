import fs from 'fs';
import nodePath from 'path';

export interface SettingsData {
	startup: boolean;
	minimized: boolean;
	transport: 'ipc' | 'websocket';
}

export namespace Settings {

	const path: string = nodePath.join(__dirname, '../../data/settings.json');
	export const dflt: SettingsData = {
		startup: true,
		minimized: false,
		transport: 'ipc',
	};

	export function get(): SettingsData {
		return { ...dflt, ...JSON.parse(fs.readFileSync(path, { encoding: 'utf8'})) };
	}
	export function set(data: Partial<SettingsData>): void {
		fs.writeFileSync(path, JSON.stringify({ ...get(), ...data }), { encoding: 'utf8' });
	}

}