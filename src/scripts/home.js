const mainFrame = document.getElementById('main-frame');
const menuFrame = document.getElementById('menu-frame');

const presencesButton = document.getElementById('menu-button-presences');
const settingsButton = document.getElementById('menu-button-settings');
const documentationButton = document.getElementById('menu-button-documentation');

//const presencesTemplate = document.getElementById('template-presences');
const presencesTemplate = document.getElementById('template-presences-presence'); //For testing
const settingsTemplate = document.getElementById('template-settings');
const documentationTemplate = document.getElementById('template-documentation');

const menuButtons = [presencesButton, settingsButton, documentationButton];

const setLastFocused = (element) => {
	menuButtons.forEach((v) => {
		if(v === element) { v.classList.add('select-button-focused'); }
		else { v.classList.remove('select-button-focused'); }
	});
};

presencesButton.addEventListener('click', async (event) => {
	mainFrame.innerHTML = presencesTemplate.innerHTML;
	setLastFocused(presencesButton);
});
settingsButton.addEventListener('click', async (event) => {
	mainFrame.innerHTML = settingsTemplate.innerHTML;
	setLastFocused(settingsButton);
});
documentationButton.addEventListener('click', async (event) => {
	mainFrame.innerHTML = documentationTemplate.innerHTML;
	setLastFocused(documentationButton);
});

//Start with presences section
mainFrame.innerHTML = presencesTemplate.innerHTML;
setLastFocused(presencesButton);

//Make manager for presence settings