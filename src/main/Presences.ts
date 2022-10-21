import fs, { Stats } from 'fs';
import nodePath from 'path';
import { Presence as PresenceRPC } from 'discord-rpc';
import { Config } from './Config';

export interface PresenceButton {
	label: string;
	url: string;
}
export interface PresenceData {
	id: string;
	state: string;
	details: string;
	startTimestamp: string;
	endTimestamp: string;
	largeImageKey: string ;
	largeImageText: string;
	smallImageKey: string;
	smallImageText: string;
	partySize: string;
	partyMax: string;
	buttons: Array<PresenceButton>;
	buttonOneEnabled: boolean;
	buttonTwoEnabled: boolean;
}
export interface Presence {
	name: string;
	path: string;
	data: PresenceData;
}
export interface PresenceCreateOptions {
	id: string;
	name: string;
	image?: string;
}


export namespace Presences {

	export const dflt: PresenceData = {
		id: '',
		state: '',
		details: '',
		startTimestamp: '',
		endTimestamp: '',
		largeImageKey: '',
		largeImageText: '',
		smallImageKey: '',
		smallImageText: '',
		partySize: '',
		partyMax: '',
		buttons: [
			{
				label: '',
				url: 'https://discord.com/',
			},
			{
				label: '',
				url: 'https://discord.com/'
			}
		],
		buttonOneEnabled: false,
		buttonTwoEnabled: false,
	};

	export function getAll(): Array<Presence> {
		const presences: Array<Presence> = [];
		const presenceFolder: Array<string> = fs.readdirSync(nodePath.join(Config.path, 'data/presences'));
		presenceFolder.forEach((v) => {
			presences.push(Presences.get(v));
		});
		return presences;
	}
	export function get(name: string): Presence | undefined {
		const path: string = nodePath.join(Config.path, 'data/presences', name);
		if(!fs.existsSync(path) || !fs.existsSync(nodePath.join(path, 'data.json'))) return;
		return {
			name,
			path,
			data: JSON.parse(fs.readFileSync(nodePath.join(path, 'data.json'), { encoding: 'utf8' })),
		} as Presence;
	}
	export function exists(name: string): boolean {
		return fs.existsSync(nodePath.join(Config.path, 'data/presences', name));
	}
	export function create(options: PresenceCreateOptions): void {
		try { fs.mkdirSync(nodePath.join(Config.path, 'data/presences', options.name)); } catch(e) { console.error(e); }
		fs.writeFileSync(nodePath.join(Config.path, 'data/presences', options.name, 'data.json'), JSON.stringify({ ...dflt, id: options.id }));
		if(options.image) fs.copyFileSync(options.image, nodePath.join(Config.path, 'data/presences', options.name, 'image'));
	}
	export function remove(name: string): void {
		fs.rmSync(nodePath.join(Config.path, 'data/presences', name));
	}
	export function processToData(activity: PresenceData): PresenceRPC {
		if(activity.startTimestamp === 'start') activity.startTimestamp = Date.now();
	
		return activity as PresenceRPC;
	}
}