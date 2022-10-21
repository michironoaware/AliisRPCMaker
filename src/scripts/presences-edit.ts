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

const imageView = document.getElementById('presences-edit-image') as HTMLImageElement;

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

const params = new URLSearchParams(window.location.search);
let presence = Presences.get(params.get('name')!);
let presenceImage = path.join(presence!.path, 'image');

function loadPresence() {
	if(!presence) window.location.href = './presences.html';
	imageView.src = fs.existsSync(presenceImage) ? presenceImage : '../assets/discord0.ico';
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
	inputs.startTimestamp.valueAsNumber = presence!.data.startTimestamp ? Number.parseInt(presence!.data.startTimestamp) : NaN;
	inputs.endTimestamp.valueAsNumber = presence!.data.endTimestamp ? Number.parseInt(presence!.data.endTimestamp) : NaN;
	inputs.buttonOneLabel.value = presence!.data.buttons[0].label;
	inputs.buttonOneUrl.value = presence!.data.buttons[0].url;
	inputs.buttonTwoLabel.value = presence!.data.buttons[1].label;
	inputs.buttonTwoUrl.value = presence!.data.buttons[1].url;

	inputs.buttonOneEnabled.checked = presence!.data.buttonOneEnabled;
	inputs.buttonTwoEnabled.checked = presence!.data.buttonTwoEnabled;
}

function presencesUpdated() {
	return (
		inputs.name.value !== presence!.name ||
		(inputs.image.files?.[0]?.path ?? presenceImage) !== presenceImage ||
		inputs.id.value !== presence!.data.id ||
		inputs.state.value !== presence!.data.state ||
		inputs.details.value !== presence!.data.details ||
		inputs.largeImageKey.value !== presence!.data.largeImageKey ||
		inputs.largeImageText.value !== presence!.data.largeImageText ||
		inputs.smallImageKey.value !== presence!.data.smallImageKey ||
		inputs.smallImageText.value !== presence!.data.smallImageText ||
		inputs.partySize.value !== presence!.data.partySize ||
		inputs.partyMax.value !== presence!.data.partyMax ||
		(inputs.startTimestamp.valueAsNumber !== Number.parseInt(presence!.data.startTimestamp) && !(isNaN(inputs.startTimestamp.valueAsNumber) && isNaN(Number.parseInt(presence!.data.startTimestamp)))) ||
		(inputs.endTimestamp.valueAsNumber !== Number.parseInt(presence!.data.endTimestamp) && !(isNaN(inputs.endTimestamp.valueAsNumber) && isNaN(Number.parseInt(presence!.data.endTimestamp)))) ||
		inputs.buttonOneLabel.value !== presence!.data.buttons[0].label ||
		inputs.buttonOneUrl.value !== presence!.data.buttons[0].url ||
		inputs.buttonOneEnabled.checked !== presence!.data.buttonOneEnabled ||
		inputs.buttonTwoLabel.value !== presence!.data.buttons[1].label ||
		inputs.buttonTwoUrl.value !== presence!.data.buttons[1].url ||
		inputs.buttonTwoEnabled.checked !== presence!.data.buttonTwoEnabled
	);
}

function onChanges(): void {
	const updated = presencesUpdated();
	changedSign.classList.add(updated ? 'popupChangedUp' : 'popupChangedDown');
	changedSign.classList.remove(updated ? 'popupChangedDown' : 'popupChangedUp', 'popupChangedShake'); 
	if(!updated) setTimeout(() => changedSign.classList.remove('popupChangedDown'), 500);
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
loadPresence();

//DO SAVE