import fs from 'fs';
import path from 'path';
import os from 'os';

export namespace Utils {
	export function detectDiscord() {
		const user: string = os.userInfo().username;
		return {
			stable: fs.existsSync(path.normalize(`C:/Users/${user}/AppData/Local/Discord/Update.exe`)),
			ptb: fs.existsSync(path.normalize(`C:/Users/${user}/AppData/Local/DiscordPTB/Update.exe`)),
			canary: fs.existsSync(path.normalize(`C:/Users/${user}/AppData/Local/DiscordCanary/Update.exe`)),
		};
	}
}