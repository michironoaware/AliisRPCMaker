import fs, { Stats } from 'fs';
import path from 'path';
import { Presence as PresenceRPC } from 'discord-rpc';

export interface PresenceButton {
	label: string;
	url: string;
}
export interface PresenceData {
	id: string;
	state?: string | undefined;
	details?: string | undefined;
	startTimestamp?: number | 'start' | undefined;
	endTimestamp?: number | undefined;
	largeImageKey?: string | undefined;
	largeImageText?: string | undefined;
	smallImageKey?: string | undefined;
	smallImageText?: string | undefined;
	instance?: boolean | undefined;
	partyId?: string | undefined;
	partySize?: number | undefined;
	partyMax?: number | undefined;
	matchSecret?: string | undefined;
	spectateSecret?: string | undefined;
	joinSecret?: string | undefined;
	buttons?: Array<[PresenceButton, PresenceButton?]> | undefined;
}
export interface Presence {
	name: string;
	image?: string;
	data: PresenceData;
}
export interface PresenceCreateOptions {
	name: string;
	image?: string;
	id: string;
}

export namespace Presences {

	export function getAll(): Array<Presence> {
		const presences: Array<Presence> = [];
		const presenceFolder: Array<string> = fs.readdirSync(path.join(__dirname, './presences/'));
		presenceFolder.forEach((v) => {
			const presencePath: string = path.join(__dirname, 'presences', v);
			const presenceStat: Stats = fs.lstatSync(presencePath);
			if(presenceStat.isFile()) { return; }

			const presenceDataPath: string = path.join(__dirname, 'presences', v, 'data.json');
			const presenceDataStat: Stats  | undefined = fs.lstatSync(presenceDataPath, { throwIfNoEntry: false });
			if(!presenceDataStat || presenceDataStat.isDirectory()) { return; }

			const presenceImagePath: string = path.join(__dirname, 'presences', v, 'image');
			const presenceImageStat: Stats  | undefined = fs.lstatSync(presenceImagePath, { throwIfNoEntry: false });
			presences.push({
				name: v,
				image: presenceImageStat?.isFile() ? presenceImagePath : undefined,
				data: JSON.parse(fs.readFileSync(presenceDataPath, { encoding: 'utf8' })),
			});
		});
		return presences;
	}
	export function get(name: string): Presence {
		const p: string = path.join(__dirname, 'presences', name);
		const imageP: string = path.join(p, 'image');
		const imageS: Stats | undefined = fs.lstatSync(imageP, { throwIfNoEntry: false });
		return {
			name,
			image: imageS?.isFile() ? imageP : undefined,
			data: JSON.parse(fs.readFileSync(path.join(p, 'data.json'), { encoding: 'utf8' })),
		} as Presence;
	}
	export function exists(name: string): boolean {
		return fs.existsSync(path.join(__dirname, 'presences', name));
	}
	export function create(options: PresenceCreateOptions): Presence {
		fs.writeFileSync(path.join(__dirname, 'presences', options.name, 'data.json'), JSON.stringify({ id: options.id }));
		if(options.image) fs.copyFileSync(options.image, path.join(__dirname, 'presences', options.name, 'image'));

		return {
			name: options.name,
			image: options.image,
			data: { id: options.id },
		} as Presence;
	}
	export function remove(name: string): void {
		fs.rmSync(path.join(__dirname, 'presences', name));
	}
	export function processToData(activity: PresenceData): PresenceRPC {
		if(activity.startTimestamp === 'start') activity.startTimestamp = Date.now();
	
		return activity as PresenceRPC;
	}
}