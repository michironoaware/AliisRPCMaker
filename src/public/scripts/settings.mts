export const changedSign = document.getElementById('settings-changed') as HTMLDivElement;
const saveButton: HTMLButtonElement = document.getElementById('settings-save') as HTMLButtonElement;
const resetButton: HTMLButtonElement = document.getElementById('settings-reset') as HTMLButtonElement;

const startup: HTMLInputElement = document.getElementById('settings-options-startup') as HTMLInputElement;
const minimized: HTMLInputElement = document.getElementById('settings-options-minimized') as HTMLInputElement;
const transport: NodeListOf<HTMLInputElement> = document.getElementsByName('settings-options-transport') as NodeListOf<HTMLInputElement>;
let settings: SettingsData = await settingsGet();

function loadSettings() {
	startup.checked = settings.startup;
	minimized.checked = settings.minimized;
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
export function settingsUpdated(): boolean {
	return (
		startup.checked !== settings.startup ||
		minimized.checked !== settings.minimized ||
		optionListUpdated(transport, settings.transport)
	);
};
function onChanges(): void {
	const updated = settingsUpdated();
	changedSign.classList.add(updated ? 'settingsChangedUp' : 'settingsChangedDown');
	changedSign.classList.remove(updated ? 'settingsChangedDown' : 'settingsChangedUp', 'settingsChangedShake'); 
	if(!updated) setTimeout(() => changedSign.classList.remove('settingsChangedDown'), 500);
}

saveButton.addEventListener('click', async () => {
	await settingsSet({
		startup: startup.checked,
		minimized: minimized.checked,
		transport: getCheckedBox(transport)?.value,
	});
	settings = await settingsGet();
	onChanges();
});
resetButton.addEventListener('click', () => {
	loadSettings();
	onChanges();
});

[ startup, minimized, ...transport ].forEach(element => element.addEventListener('click', onChanges));
loadSettings();