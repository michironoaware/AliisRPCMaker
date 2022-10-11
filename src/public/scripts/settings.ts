(async () => {
	const changedSign = document.getElementById('settings-changed') as HTMLDivElement;
	const saveButton: HTMLButtonElement = document.getElementById('settings-save') as HTMLButtonElement;
	const resetButton: HTMLButtonElement = document.getElementById('settings-reset') as HTMLButtonElement;

	const startup: HTMLInputElement = document.getElementById('settings-options-startup') as HTMLInputElement;
	const minimized: HTMLInputElement = document.getElementById('settings-options-minimized') as HTMLInputElement;
	const transport: NodeListOf<HTMLInputElement> = document.getElementsByName('settings-options-transport') as NodeListOf<HTMLInputElement>;
	const allElements = [ startup, minimized, ...transport ];
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
	function checkChanges(): void {
		const updated = (
			startup.checked !== settings.startup ||
			minimized.checked !== settings.minimized ||
			optionListUpdated(transport, settings.transport)
		);
		changedSign.classList.add(updated ? 'settingsChangedUp' : 'settingsChangedDown');
		changedSign.classList.remove(updated ? 'settingsChangedDown' : 'settingsChangedUp'); 
	}

	saveButton.addEventListener('click', async () => {
		await settingsSet({
			startup: startup.checked,
			minimized: minimized.checked,
			transport: getCheckedBox(transport)?.value,
		});
		settings = await settingsGet();
		checkChanges();
	});
	resetButton.addEventListener('click', () => {
		loadSettings();
		checkChanges();
	});
	allElements.forEach(element => element.addEventListener('change', checkChanges));
	loadSettings();
})();