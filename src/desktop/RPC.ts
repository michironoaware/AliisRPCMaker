import { Client, Presence } from 'discord-rpc';
import { Presences, PresenceData } from './Presences';
import { Settings } from './Settings';

export namespace RPC {
	let client: Client | null = null;
	let interval: NodeJS.Timer | null = null;

	export async function startActivity(activity: PresenceData): Promise<void> {
		stopActivity();
		const processedActivity: Presence = Presences.processData({ ...activity }); 
		client = new Client({ transport: Settings.read().transport });
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
	}
}