import fs from 'fs';
import path from 'path';
import { PresenceData, Presence, Presences } from '../main/Presences';
import { Utils } from '../main/Utils';

const changedSign: HTMLDivElement = document.getElementById('presences-changed') as HTMLDivElement;
const saveButton: HTMLButtonElement = document.getElementById('presences-save') as HTMLButtonElement;
const resetButton: HTMLButtonElement = document.getElementById('presences-reset') as HTMLButtonElement;

const buttonOneInputDiv: HTMLDivElement = document.getElementById('presences-edit-data-button1-inputdiv') as HTMLDivElement;
const buttonOneInputs: Array<HTMLInputElement> = [
	document.getElementById('presences-edit-data-button1-label') as HTMLInputElement,
	document.getElementById('presences-edit-data-button1-url') as HTMLInputElement
];
const buttonTwoInputDiv: HTMLDivElement = document.getElementById('presences-edit-data-button2-inputdiv') as HTMLDivElement;
const buttonTwoInputs: Array<HTMLInputElement> = [
	document.getElementById('presences-edit-data-button2-label') as HTMLInputElement,
	document.getElementById('presences-edit-data-button2-url') as HTMLInputElement
];

const imageView: HTMLImageElement = document.getElementById('presences-edit-image') as HTMLImageElement;

const inputs = {
	name: document.getElementById('presences-edit-name') as HTMLInputElement,
	image: document.getElementById('presences-edit-image-file') as HTMLInputElement,
	id: document.getElementById('presences-edit-data-id') as HTMLInputElement,
	state: document.getElementById('presences-edit-data-state') as HTMLInputElement,
	details: document.getElementById('presences-edit-data-details') as HTMLInputElement,
	largeImageKey: document.getElementById('presences-edit-data-largeImageKey') as HTMLInputElement,
	largeImageText: document.getElementById('presences-edit-data-largeImageText') as HTMLInputElement,
	smallImageKey: document.getElementById('presences-edit-data-smallImageKey') as HTMLInputElement,
	smallImageText: document.getElementById('presences-edit-data-smallImageText') as HTMLInputElement,
	partySize: document.getElementById('presences-edit-data-partySize') as HTMLInputElement,
	partyMax: document.getElementById('presences-edit-data-partyMax') as HTMLInputElement,
	startTimestamp: document.getElementById('presences-edit-data-startTimestamp') as HTMLInputElement,
	endTimestamp: document.getElementById('presences-edit-data-endTimestamp') as HTMLInputElement,
	buttonOneLabel: document.getElementById('presences-edit-data-button1-label') as HTMLInputElement,
	buttonOneUrl: document.getElementById('presences-edit-data-button1-url') as HTMLInputElement,
	buttonOneEnabled: document.getElementById('presences-edit-data-button1-enabled') as HTMLInputElement,
	buttonTwoLabel: document.getElementById('presences-edit-data-button2-label') as HTMLInputElement,
	buttonTwoUrl: document.getElementById('presences-edit-data-button2-url') as HTMLInputElement,
	buttonTwoEnabled: document.getElementById('presences-edit-data-button2-enabled') as HTMLInputElement,
};

let presenceName: string = new URLSearchParams(window.location.search).get('name')!;
let presence: Presence | undefined = Presences.get(presenceName);
if(!presence) window.location.href = './presences.html';
let presenceImage: string = path.join(presence!.path, 'image');

function loadPresence() {
	inputs.image.value = '';
	if(!presence) window.location.href = './presences.html';
	inputs.name.value = presence!.name;
	inputs.id.value = presence!.data.id;
	inputs.state.value = presence!.data.state;
	inputs.details.value = presence!.data.details;
	inputs.largeImageKey.value = presence!.data.largeImageKey;
	inputs.largeImageText.value = presence!.data.largeImageText;
	inputs.smallImageKey.value = presence!.data.smallImageKey;
	inputs.smallImageText.value = presence!.data.smallImageText;
	inputs.partySize.value = presence!.data.partySize;
	inputs.partyMax.value = presence!.data.partyMax;
	inputs.startTimestamp.valueAsNumber = presence!.data.startTimestamp ?? NaN;
	inputs.endTimestamp.valueAsNumber = presence!.data.endTimestamp ?? NaN;
	inputs.buttonOneLabel.value = presence!.data.buttons[0].label;
	inputs.buttonOneUrl.value = presence!.data.buttons[0].url;
	inputs.buttonTwoLabel.value = presence!.data.buttons[1].label;
	inputs.buttonTwoUrl.value = presence!.data.buttons[1].url;

	inputs.buttonOneEnabled.checked = presence!.data.buttonOneEnabled;
	inputs.buttonTwoEnabled.checked = presence!.data.buttonTwoEnabled;
}

function presencesUpdated(): boolean {
	return (
		inputs.name.value !== presence!.name ||
		inputs.image.value !== '' ||
		inputs.id.value !== presence!.data.id ||
		inputs.state.value !== presence!.data.state ||
		inputs.details.value !== presence!.data.details ||
		inputs.largeImageKey.value !== presence!.data.largeImageKey ||
		inputs.largeImageText.value !== presence!.data.largeImageText ||
		inputs.smallImageKey.value !== presence!.data.smallImageKey ||
		inputs.smallImageText.value !== presence!.data.smallImageText ||
		inputs.partySize.value !== presence!.data.partySize ||
		inputs.partyMax.value !== presence!.data.partyMax ||
		inputs.startTimestamp.valueAsNumber !== (presence!.data.startTimestamp ?? NaN) && !(isNaN(inputs.startTimestamp.valueAsNumber) && isNaN(presence!.data.startTimestamp ?? NaN)) ||
		inputs.endTimestamp.valueAsNumber !== (presence!.data.endTimestamp ?? NaN) && !(isNaN(inputs.endTimestamp.valueAsNumber) && isNaN(presence!.data.endTimestamp ?? NaN)) ||
		inputs.buttonOneLabel.value !== presence!.data.buttons[0].label ||
		inputs.buttonOneUrl.value !== presence!.data.buttons[0].url ||
		inputs.buttonOneEnabled.checked !== presence!.data.buttonOneEnabled ||
		inputs.buttonTwoLabel.value !== presence!.data.buttons[1].label ||
		inputs.buttonTwoUrl.value !== presence!.data.buttons[1].url ||
		inputs.buttonTwoEnabled.checked !== presence!.data.buttonTwoEnabled
	);
}

function onChanges(): void {
	const updated: boolean = presencesUpdated();
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

inputs.buttonOneEnabled.addEventListener('change', () => {
	if(inputs.buttonOneEnabled.checked) {
		buttonOneInputDiv.classList.remove('[&>*]:opacity-50');
		buttonOneInputs.forEach(e => {
			e.classList.remove('cursor-not-allowed');
			e.disabled = false;
		});
	}
	else {
		buttonOneInputDiv.classList.add('[&>*]:opacity-50');
		buttonOneInputs.forEach(e => {
			e.classList.add('cursor-not-allowed');
			e.disabled = true;
		});
	}
});
inputs.buttonTwoEnabled.addEventListener('change', () => {
	if(inputs.buttonTwoEnabled.checked) {
		buttonTwoInputDiv.classList.remove('[&>*]:opacity-50');
		buttonTwoInputs.forEach(e => {
			e.classList.remove('cursor-not-allowed');
			e.disabled = false;
		});
	}
	else {
		buttonTwoInputDiv.classList.add('[&>*]:opacity-50');
		buttonTwoInputs.forEach(e => {
			e.classList.add('cursor-not-allowed');
			e.disabled = true;
		});
	}
});
inputs.image.addEventListener('change', () => imageView.src = inputs.image.files?.[0]?.path ?? presenceImage);
Object.values(inputs).forEach(e => e.addEventListener('change', onChanges));
Object.values(inputs).forEach(e => e.addEventListener('input', onChanges));
saveButton.addEventListener('click', () => {
	Presences.edit({
		name: inputs.name.value,
		oldName: presenceName,
		image: inputs.image.files?.[0]?.path,
		data: {
			id: inputs.id.value,
			state: inputs.state.value,
			details: inputs.details.value,
			largeImageKey: inputs.largeImageKey.value,
			largeImageText: inputs.largeImageText.value,
			smallImageKey: inputs.smallImageKey.value,
			smallImageText: inputs.smallImageText.value,
			partySize: inputs.partySize.value,
			partyMax: inputs.partyMax.value,
			startTimestamp: inputs.startTimestamp.valueAsNumber ?? null,
			endTimestamp: inputs.endTimestamp.valueAsNumber ?? null,
			buttons: [
				{
					label: inputs.buttonOneLabel.value,
					url: inputs.buttonOneUrl.value,
				},
				{
					label: inputs.buttonTwoLabel.value,
					url: inputs.buttonTwoUrl.value,
				},
			],
			buttonOneEnabled: inputs.buttonOneEnabled.checked,
			buttonTwoEnabled: inputs.buttonTwoEnabled.checked,
		}
	});
	presenceName = inputs.name.value;
	presence = Presences.get(presenceName);
	presenceImage = path.join(presence!.path, 'image');
	loadPresence();
	onChanges();
});

resetButton.addEventListener('click', () => {
	imageView.src = fs.existsSync(presenceImage) ? presenceImage : '../assets/discord0.ico';
	loadPresence();
	onChanges();
});

imageView.src = fs.existsSync(presenceImage) ? presenceImage : '../assets/discord0.ico';
loadPresence();