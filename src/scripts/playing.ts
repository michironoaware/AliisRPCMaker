import fs from 'fs';
import path from 'path';
import { Config } from '../main/Config';
import { Directory } from '../main/Directory';
import { Presence, Presences } from '../main/Presences';
import { RPC } from '../main/RPC';

const playing: HTMLDivElement = document.getElementById('menu-playing') as HTMLDivElement;
const name: HTMLHeadingElement = document.getElementById('menu-playing-name') as HTMLHeadingElement;
const status: HTMLHeadingElement = document.getElementById('menu-playing-status') as HTMLHeadingElement;
const image: HTMLImageElement = document.getElementById('menu-playing-image') as HTMLImageElement;
const buttons: HTMLDivElement = document.getElementById('menu-playing-buttons') as HTMLDivElement;
const pause: HTMLButtonElement = document.getElementById('menu-playing-pause') as HTMLButtonElement;
const stop: HTMLButtonElement = document.getElementById('menu-playing-stop') as HTMLButtonElement;
const select: HTMLDivElement = document.getElementById('menu-playing-select') as HTMLDivElement;
const selectList: HTMLDivElement = document.getElementById('menu-playing-select-list') as HTMLDivElement;


function updatePresenceList() {
	const presences: Array<Presence> = Presences.getAll();
	selectList.innerHTML = '';
	if(presences.length > 0) {
		presences.forEach(presence => {
			const button: HTMLButtonElement = document.createElement('button');
			button.innerHTML = createPresenceSelection(presence);
			button.addEventListener('mousedown', () => {
				RPC.startActivity(presence);
				activityStarted();
			});
			selectList.appendChild(button);
		});
	}
	else selectList.insertAdjacentHTML('beforeend', '<button class="w-full p-[0.5rem] bg-half-sextenary hover:bg-half-secondary text-sm text-start text-white text-opacity-60 cursor-not-allowed truncate transition-colors duration-100">You don\'t have any</button>');
}
function createPresenceSelection(presence: Presence): string {
	return `<button class='w-full p-[0.5rem] bg-half-sextenary hover:bg-half-secondary text-sm text-start text-white text-opacity-90 cursor-pointer truncate transition-colors duration-100'>${presence.name}</button>`.trim();
}
function activityStarted() {
	const imagePath = path.join(RPC.actualActivity.path!, 'image');
	playing.classList.add('!opacity-0');
	setTimeout(() => {
		name.textContent = RPC.actualActivity.name;
		status.textContent = 'Running';
		image.src = fs.existsSync(imagePath) ? imagePath : '../assets/discord0.ico';
		select.classList.add('!hidden');
		buttons.classList.remove('!hidden');
		playing.classList.remove('!opacity-0');
	}, 300);
}

pause.addEventListener('click', () => {
	RPC.paused = !RPC.paused;
	pause.textContent = RPC.paused ? 'Unpause' : 'Pause';
});
stop.addEventListener('click', () => {
	RPC.stopActivity();
	playing.classList.add('!opacity-0');
	setTimeout(() => {
		name.textContent = 'Nothing';
		status.textContent = 'Waiting';
		image.src = path.normalize('../assets/discord0.ico');
		buttons.classList.add('!hidden');
		select.classList.remove('!hidden');
		playing.classList.remove('!opacity-0');
	}, 300);
});
select.addEventListener('focusin', () => selectList.classList.remove('!hidden'));
select.addEventListener('focusout', () => selectList.classList.add('!hidden'));

Directory.watch(path.join(Config.path, 'data/presences'), updatePresenceList);

updatePresenceList();
if(RPC.client) activityStarted();