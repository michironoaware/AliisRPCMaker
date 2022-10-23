import { Settings, SettingsData } from '../main/Settings';

const changedSign = document.getElementById('settings-changed') as HTMLDivElement;
const saveButton: HTMLButtonElement = document.getElementById('settings-save') as HTMLButtonElement;
const resetButton: HTMLButtonElement = document.getElementById('settings-reset') as HTMLButtonElement;

const minimizedMenu: HTMLInputElement = document.getElementById('settings-menu-minimized') as HTMLInputElement;

const startup: HTMLInputElement = document.getElementById('settings-options-startup') as HTMLInputElement;
const minimized: HTMLInputElement = document.getElementById('settings-options-minimized') as HTMLInputElement;
const transport: NodeListOf<HTMLInputElement> = document.getElementsByName('settings-options-transport') as NodeListOf<HTMLInputElement>;
let settings: SettingsData = Settings.get();

function loadSettings() {
	startup.checked = settings.startup;
	minimized.checked = settings.minimized;
	canSetMinimized();
	for(const element of transport) {
		if(element.value === settings.transport) {
			element.checked = true;
			break;
		}
	}
}
function getCheckedBox(list: NodeListOf<HTMLInputElement>): HTMLInputElement | undefined {
	for(const element of list) if(element.checked) return element;
}
function optionListUpdated(list: NodeListOf<HTMLInputElement>, actualSetting: string): boolean {
	for(const element of list) if(element.checked && element.value !== actualSetting) return true;
	return false;
}
function settingsUpdated(): boolean {
	return (
		startup.checked !== settings.startup ||
		minimized.checked !== settings.minimized ||
		optionListUpdated(transport, settings.transport)
	);
};
function onChanges(): void {
	const updated: boolean = settingsUpdated();
	if(updated && !changedSign.classList.contains('popupChangedUp')) {
		changedSign.classList.remove('popupChangedDown');
		changedSign.classList.add('popupChangedUp');
	}
	else if(!updated && changedSign.classList.contains('popupChangedUp')) {
		changedSign.classList.remove('popupChangedUp');
		changedSign.classList.add('popupChangedDown');
		if(!updated) setTimeout(() => changedSign.classList.remove('popupChangedDown'), 500);
	} 
}
function canSetMinimized() {
	minimized.disabled = !startup.checked;
	if(!startup.checked) {
		minimizedMenu.classList.add('[&>*]:opacity-50');
		minimized.classList.add('cursor-not-allowed');
	}
	else {
		minimizedMenu.classList.remove('[&>*]:opacity-50');
		minimized.classList.remove('cursor-not-allowed');
	}
}

saveButton.addEventListener('click', async () => {
	await Settings.set({
		startup: startup.checked,
		minimized: minimized.checked,
		transport: getCheckedBox(transport)?.value as SettingsData['transport'],
	});
	settings = Settings.get();
	onChanges();
});
resetButton.addEventListener('click', () => {
	loadSettings();
	onChanges();
});

startup.addEventListener('change', canSetMinimized);


[ startup, minimized, ...transport ].forEach(element => element.addEventListener('change', onChanges));
loadSettings();