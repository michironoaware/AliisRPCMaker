import { Client, Presence } from 'discord-rpc';
import { Presences, PresenceData } from './Presences.js';
import { Settings } from './Settings.js';

export namespace RPC {

	let client: Client | null = null;
	let interval: NodeJS.Timer | null = null;

	/*TODO*//*
	export async function startActivity(activity: PresenceData): Promise<void> {
		stopActivity();
		const processedActivity: Presence = Presences.processToData({ ...activity }); 
		client = new Client({ transport: Settings.get().transport });
		client.on('ready', () => {
			interval = setInterval(() => {
				client!.setActivity(processedActivity);
			}, 15000);
		});
	}
	export async function stopActivity() {
		if(interval) {
			clearInterval(interval);
			interval = null;
		}
		if(client) {
			client.destroy();
			client = null;
		}
	}*/
}