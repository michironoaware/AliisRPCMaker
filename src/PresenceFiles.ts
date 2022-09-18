import fs, { Stats } from 'fs';
import path from 'path';
import { Presence } from './types';

//TODO: Remove this, do manually for better error handling > this
export class PresenceFiles {
	/** Gets and packs into Presence interfaces the files stored in the 'presences' folder */
	public static getPresences(): Array<Presence> {
		const presences: Array<Presence> = [];
		const presenceFolder: Array<string> = fs.readdirSync('../presences/');
		presenceFolder.forEach((v) => {
			const presencePath: string = path.join(__dirname, 'presences', v);
			const presenceStat: Stats = fs.lstatSync(presencePath);
			if(presenceStat.isFile()) { return; }
			
			const presenceDataPath: string = path.join(__dirname, 'presences', v, 'data.json');
			const presenceDataStat: Stats  | undefined = fs.lstatSync(presenceDataPath, { throwIfNoEntry: false });
			if(!presenceDataStat || presenceDataStat.isDirectory()) { return; }
			
			const presenceImagePath: string = path.join(__dirname, 'presences', v, 'image');

			presences.push({
				data: JSON.parse(fs.readFileSync(presenceDataPath, { encoding: 'utf8' })),
				image: fs.readFileSync(presenceImagePath)
			});
		});
		return presences;
	}
	public static removePresence(name: string): void {
		fs.rmSync(path.join(__dirname, 'presences', name));
	}
}