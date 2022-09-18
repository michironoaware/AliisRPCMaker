import { Client } from 'discord-rpc';
import { processPresenceData } from './processPresenceData';
import { Settings } from './Settings';
import { PresenceData } from './types/PresenceData';

export class RPC {
	private client: Client | null = null;
	private interval: NodeJS.Timer | null = null;

	public async startActivity(activity: PresenceData): Promise<void> {
		this.stopActivity();
		this.client = new Client({ transport: Settings.read().transport });
		this.client.on('ready', () => {
			this.interval = setInterval(() => {
				this.client!.setActivity(processPresenceData({ ...activity }));
			}, 15000);
		});
	}
	public async stopActivity() {
		if(this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		if(this.client) {
			this.client.destroy();
			this.client = null;
		}
	}
}