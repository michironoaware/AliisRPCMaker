const webview: HTMLIFrameElement = document.getElementById('webview') as HTMLIFrameElement;
const presences: HTMLButtonElement = document.getElementById('menu-presences') as HTMLButtonElement;
const settings: HTMLButtonElement = document.getElementById('menu-settings') as HTMLButtonElement;
const documentation: HTMLButtonElement = document.getElementById('menu-documentation') as HTMLButtonElement;
const navs = {
	'../views/presences.html': presences,
	'../views/settings.html': settings,
	'../views/documentation': documentation,
};

function setFocused(element: HTMLElement) {
	for(const key in navs) {
		navs[key as keyof typeof navs].classList.remove('bg-primary');
		navs[key as keyof typeof navs].classList.add('text-opacity-80');
	}
	element.classList.add('bg-primary');
	element.classList.remove('text-opacity-80');
}

for(const key in navs) {
	navs[key as keyof typeof navs].addEventListener('click', () => {
		webview.src = key;
		setFocused(navs[key as keyof typeof navs]);
	});
}

webview.src = '../views/presences.html';
setFocused(navs['../views/presences.html']);