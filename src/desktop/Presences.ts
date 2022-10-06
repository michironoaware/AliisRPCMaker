import fs, { Stats } from 'fs';
import path from 'path';
import { Presence as PresenceRaw } from 'discord-rpc';

export interface PresenceButton {
	label: string;
	url: string;
}
export interface PresenceData {
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
	data: PresenceData;
	image: string | null;
}

export namespace Presences {

	export function get(): Array<Presence> {
		const presences: Array<Presence> = [];
		const presenceFolder: Array<string> = fs.readdirSync('../presences/');
		presenceFolder.forEach((v) => {
			const presencePath: string = path.join(__dirname, 'presences', v);
			const presenceStat: Stats = fs.lstatSync(presencePath);
			if(presenceStat.isFile()) { return; }
			
			const presenceDataPath: string = path.join(__dirname, 'presences', v, 'data');
			const presenceDataStat: Stats  | undefined = fs.lstatSync(presenceDataPath, { throwIfNoEntry: false });
			if(!presenceDataStat || presenceDataStat.isDirectory()) { return; }
			
			const presenceImagePath: string = path.join(__dirname, 'presences', v, 'image');
			const presenceImageStat: Stats  | undefined = fs.lstatSync(presenceImagePath, { throwIfNoEntry: false });
			presences.push({
				data: JSON.parse(fs.readFileSync(presenceDataPath, { encoding: 'utf8' })),
				image: presenceImageStat?.isFile() ? presenceImagePath : null
			});
		});
		return presences;
	}
	export function remove(name: string): void {
		fs.rmSync(path.join(__dirname, 'presences', name));
	}
	export function processData(activity: PresenceData): PresenceRaw {
		if(activity.startTimestamp === 'start') activity.startTimestamp = Date.now();
	
		return activity as PresenceRaw;
	}
}