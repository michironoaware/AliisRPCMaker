import { Client, Presence as ClientPresence } from 'discord-rpc';
import { Presences, Presence, PresenceData } from './Presences.js';
import { Settings } from './Settings.js';
import { EventEmitter } from 'events';
export namespace RPC {

	export let client: Client | null = null;
	let interval: NodeJS.Timer | null = null;
	export let paused: boolean = false;
	export const actualActivity: { name: string | null; path: string | null; } = { name: null, path: null };

	/*TODO*/
	export async function startActivity(activity: Presence): Promise<void> {
		stopActivity();
		actualActivity.name = activity.name;
		actualActivity.path = activity.path;
		const processedActivity: ClientPresence = Presences.process(activity.data); 
		client = new Client({ transport: Settings.get().transport });
		client.on('ready', () => {
			client!.setActivity(processedActivity);
			interval = setInterval(() => {
				if(!paused) client!.setActivity(processedActivity);
			}, 15000);
		});
		client.login({ clientId: activity.data.id });
	}
	export async function stopActivity() {
		if(interval) {
			clearInterval(interval);
			interval = null;
		}
		if(client) {
			try { client.destroy(); } catch(e) { console.error(e); }
			client = null;
		}
		actualActivity.name = null;
		actualActivity.path = null;
		paused = false;
	}
}