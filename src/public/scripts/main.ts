const frameMinimize: HTMLButtonElement = document.getElementById('frame-minimize') as HTMLButtonElement;
const frameMaximize: HTMLButtonElement = document.getElementById('frame-maximize') as HTMLButtonElement;
const frameClose: HTMLButtonElement = document.getElementById('frame-close') as HTMLButtonElement;

frameMinimize.addEventListener('click', windowMinimize);
frameMaximize.addEventListener('click', windowMaximize);
frameClose.addEventListener('click', windowClose);

const menu: HTMLDivElement = document.getElementById('menu') as HTMLDivElement;
const main: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
const templates = {
	'presences-list': document.getElementById('template-presences-list') as HTMLTemplateElement,
	'presences-list-card-img': document.getElementById('template-presences-list-card-img') as HTMLTemplateElement,
	'presences-list-card-text': document.getElementById('template-presences-list-card-text') as HTMLTemplateElement,
};

function menuLastFocus(focusTo: Element): void {
	for(const e of menu.children) { if(e.tagName === 'BUTTON') e.classList.remove('bg-primary'); }
	focusTo.classList.add('bg-primary');
}
function setMain(template?: HTMLTemplateElement) {
	while(main.hasChildNodes()) main.removeChild(main.firstChild!);
	if(template) main.appendChild(template.content.cloneNode(true));
}

const selectorPresences: HTMLButtonElement = document.getElementById('selector-presences') as HTMLButtonElement;
selectorPresences.addEventListener('click', () => {
	menuLastFocus(selectorPresences);
	setMain(templates['presences-list']);
});

const selectorSettings: HTMLButtonElement = document.getElementById('selector-settings') as HTMLButtonElement;
selectorSettings.addEventListener('click', () => {
	menuLastFocus(selectorSettings);
	setMain();
});

const selectorDocumentation: HTMLButtonElement = document.getElementById('selector-documentation') as HTMLButtonElement;
selectorDocumentation.addEventListener('click', () => {
	menuLastFocus(selectorDocumentation);
	setMain();
});