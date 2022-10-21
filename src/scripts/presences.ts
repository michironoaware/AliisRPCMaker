import fs from 'fs';
import path from 'path';
import { Directory } from '../main/Directory';
import { Presence, Presences } from '../main/Presences';
import { Settings } from '../main/Settings';


const newPresenceButton: HTMLButtonElement = document.getElementById('presences-new') as HTMLButtonElement;
const newPresenceFrame: HTMLDivElement = document.getElementById('presences-new-frame') as HTMLDivElement;
const presenceList: HTMLDivElement = document.getElementById('presences-list') as HTMLDivElement;

function hideFrame(): void {
	newPresenceFrame.classList.remove('presenceFormAppear');
	newPresenceFrame.classList.add('presenceFormDisappear');
	setTimeout(() => newPresenceFrame.classList.add('!hidden'), 100);
};
function createPresenceCard(presence: Presence): string {
	const imagePath = path.join(presence.path, 'image');
	return `
	<div onclick='window.location.href = "./presences-edit.html?name=${encodeURIComponent(presence.name)}"' class='bg-half-secondary flex flex-col box-border p-[0.6rem] rounded-md w-[9.2rem] h-[11.2rem] cursor-pointer transition-all duration-[150ms] hover:bg-half-sextenary hover:shadow-[0_0.5em_1em_0.2em_#00000020] hover:translate-y-[-0.5em]'>
		<div class='mb-[0.5rem] h-[8rem] w-[8rem] rounded-md overflow-hidden'>
			<img src='${fs.existsSync(imagePath) ? imagePath : '../assets/discord0.ico'}' class='min-h-full object-cover mx-auto'>
		</div>
		<div class='text-center truncate'>${presence.name}</div>
	</div>
`.trim();
}
function updatePresences(): void {
	presenceList.innerHTML = '';
	Presences.getAll().forEach((e: any) => {
		presenceList.insertAdjacentHTML('beforeend', createPresenceCard(e));
	});
}

updatePresences();
Directory.watch(path.join(__dirname, '../../data/presences'), () => setTimeout(updatePresences, 200));

newPresenceButton.addEventListener('click', () => {
	newPresenceFrame.classList.remove('presenceFormDisappear', '!hidden');
	newPresenceFrame.classList.add('presenceFormAppear');
});
document.addEventListener('keydown', (event) => {
	if(event.code === 'Escape' && !newPresenceFrame.classList.contains('!hidden')) hideFrame();
});
[ ...document.getElementsByClassName('presences-new-close')! ].forEach(e => e.addEventListener('click', hideFrame));