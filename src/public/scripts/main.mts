import { changedSign, settingsChanged } from './settings.mjs';

const frameMinimize: HTMLButtonElement = document.getElementById('frame-minimize') as HTMLButtonElement;
const frameMaximize: HTMLButtonElement = document.getElementById('frame-maximize') as HTMLButtonElement;
const frameClose: HTMLButtonElement = document.getElementById('frame-close') as HTMLButtonElement;

const menu: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;
const main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;

const tabs: { [key: string]: {
	menu: HTMLButtonElement,
	main: HTMLDivElement,
} } = {
	presences: {
		menu: document.getElementById('menu-presences') as HTMLButtonElement,
		main: document.getElementById('main-presences') as HTMLDivElement,
	},
	settings: {
		menu: document.getElementById('menu-settings') as HTMLButtonElement,
		main: document.getElementById('main-settings') as HTMLDivElement,
	}
};

function menuLastFocus(focusTo: Element): void {
	for(const e of menu.children) { if(e.tagName === 'BUTTON') e.classList.remove('bg-primary', '!text-opacity-100'); }
	focusTo.classList.add('bg-primary', '!text-opacity-100');
}
function mainSetTab(tab?: HTMLDivElement): void {
	for(const e of main.children) e.classList.add('hidden', 'overflow-hidden');
	if(tab) tab.classList.remove('hidden', 'overflow-hidden');
}

frameMinimize.addEventListener('click', windowMinimize);
frameMaximize.addEventListener('click', windowMaximize);
frameClose.addEventListener('click', windowClose);

for(const tab in tabs) {
	tabs[tab as keyof typeof tabs].menu.addEventListener('click', () => {
		if(settingsChanged()) {
			changedSign.classList.remove('settingsChangedShake');
			setTimeout(() => changedSign.classList.add('settingsChangedShake'), 0);
			return;
		}
		menuLastFocus(tabs[tab as keyof typeof tabs].menu);
		mainSetTab(tabs[tab as keyof typeof tabs].main);
	});
}