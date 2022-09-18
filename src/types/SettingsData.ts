export interface SettingsData {
	onStartup: boolean;
	startInBrackground: boolean;
	transport: 'ipc' | 'websocket';
}