import fs, { Stats } from 'fs';
import nodePath from 'path';
import { Presence as ClientPresence } from 'discord-rpc';
import { Config } from './Config';
import { Utils } from './Utils';
import { Settings } from './Settings';

export interface PresenceButton {
	label: string;
	url: string;
}
export interface PresenceData {
	id: string;
	state: string;
	details: string;
	startTimestamp: number | null;
	endTimestamp: number | null;
	largeImageKey: string ;
	largeImageText: string;
	smallImageKey: string;
	smallImageText: string;
	partySize: number | null;
	partyMax: number | null;
	buttons: Array<PresenceButton>;
	buttonOneEnabled: boolean;
	buttonTwoEnabled: boolean;
	//startTimestampOnStart: boolean;
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
export interface PresenceEditOptions {
	name: string;
	oldName: string;
	image?: string;
	data: PresenceData;
}

export namespace Presences {

	export const dflt: PresenceData = {
		id: '',
		state: '',
		details: '',
		startTimestamp: null,
		endTimestamp: null,
		largeImageKey: '',
		largeImageText: '',
		smallImageKey: '',
		smallImageText: '',
		partySize: null,
		partyMax: null,
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
			presences.push(Presences.get(v)!);
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
	export function edit(presence: PresenceEditOptions): void {
		if(presence.oldName !== presence.name) fs.renameSync(nodePath.join(Config.path, 'data/presences', presence.oldName), nodePath.join(Config.path, 'data/presences', presence.name));
		fs.writeFileSync(nodePath.join(Config.path, 'data/presences', presence.name, 'data.json'), JSON.stringify({ ...dflt, ...presence.data }));
		if(presence.image) fs.copyFileSync(presence.image, nodePath.join(Config.path, 'data/presences', presence.name, 'image'));
	}
	export function remove(name: string): void {
		fs.rmSync(nodePath.join(Config.path, 'data/presences', name), { recursive: true, });
	}
	export function removeImage(name: string): void {
		fs.rmSync(nodePath.join(Config.path, 'data/presences', name, 'image'));
	}
	export function process(activity: PresenceData): ClientPresence {
		const partySize: string | undefined = activity.partySize ? activity.partySize.toString() : undefined;
		const partyMax: string | undefined = activity.partyMax ? activity.partyMax.toString() : undefined;
		const buttons: Array<{
			label: string;
			url: string;
		}> = [];
		if(activity.buttonOneEnabled) buttons.push({
			label: activity.buttons[0].label,
			url: activity.buttons[0].url,
		});
		if(activity.buttonTwoEnabled) buttons.push({
			label: activity.buttons[1].label,
			url: activity.buttons[1].url,
		});
		return {
			state: Utils.spaces.test(activity.state) ? undefined : activity.state,
			details: Utils.spaces.test(activity.details) ? undefined : activity.details,
			startTimestamp: activity.startTimestamp ?? undefined,
			endTimestamp: activity.endTimestamp ?? undefined,
			largeImageKey: Utils.spaces.test(activity.largeImageKey) ? undefined : activity.largeImageKey,
			largeImageText: Utils.spaces.test(activity.largeImageText) ? undefined : activity.largeImageText,
			smallImageKey: Utils.spaces.test(activity.smallImageKey) ? undefined : activity.smallImageKey,
			smallImageText: Utils.spaces.test(activity.smallImageText) ? undefined : activity.smallImageText,
			partySize: partySize && Utils.spaces.test(partySize) ? partySize : undefined,
			partyMax: partyMax && Utils.spaces.test(partyMax) ? partyMax : undefined,
			buttons: buttons.length > 0 ? buttons : undefined,
		} as ClientPresence;
	}
}