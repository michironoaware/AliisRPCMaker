const newPresenceButton: HTMLButtonElement = document.getElementById('presences-new') as HTMLButtonElement;
const newPresenceFrame: HTMLDivElement = document.getElementById('presences-new-frame') as HTMLDivElement;
const presenceList: HTMLDivElement = document.getElementById('presences-list') as HTMLDivElement;


function card(name: string, img?: string): string { 
	return `
	<div class='bg-half-secondary flex flex-col box-border p-[0.6rem] rounded-md w-[9.2rem] h-[11.2rem] cursor-pointer transition-all duration-[150ms] hover:bg-half-sextenary hover:shadow-[0_0.5em_1em_0.2em_#00000020] hover:translate-y-[-0.5em]'>
		<div class='mb-[0.5rem] h-[8rem] w-[8rem] rounded-md overflow-hidden'>
			<img src='${img ?? '../assets/discord0.ico'}' class='min-h-full object-cover'>
		</div>
		<div class='text-center truncate'>${name}</div>
	<!--TODO script for management-->
	</div>
`.trim();
}
function hideFrame(): void {
	newPresenceFrame.classList.remove('presenceFormAppear');
	newPresenceFrame.classList.add('presenceFormDisappear');
	setTimeout(() => newPresenceFrame.classList.add('!hidden'), 100);
};
function updatePresences(): void {
	setTimeout(async () => {
		presenceList.innerHTML = '';
		(await presencesGetAll()).forEach((e: any) => {
			presenceList.insertAdjacentHTML('beforeend', card(e.name, e.image));
		});
	}, 250);
}

updatePresences();
onPresencesUpdated(updatePresences);

newPresenceButton.addEventListener('click', () => {
	newPresenceFrame.classList.remove('presenceFormDisappear', '!hidden');
	newPresenceFrame.classList.add('presenceFormAppear');
});
document.addEventListener('keydown', (event) => {
	if(event.code === 'Escape' && !newPresenceFrame.classList.contains('!hidden')) hideFrame();
});
[ ...document.getElementsByClassName('presences-new-close')! ].forEach(e => e.addEventListener('click', hideFrame));

//presences-edit

const presenceEdit: HTMLDivElement = document.getElementById('presence-edit') as HTMLDivElement;
const editInputs = {
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
	buttons: [
		{
			label: document.getElementById('presences-edit-data-button1-label') as HTMLInputElement,
			url: document.getElementById('presences-edit-data-button1-url') as HTMLInputElement,
		},
		{
			label: document.getElementById('presences-edit-data-button2-label') as HTMLInputElement,
			url: document.getElementById('presences-edit-data-button2-url') as HTMLInputElement,
		}
	]
};