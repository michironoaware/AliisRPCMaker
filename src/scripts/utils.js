const wait = (ms) => new Promise((r) => setTimeout(r, ms));

//transitions: 'Disappear', 'FadeInLeft'
const applyTransition = async (transition, element, transitionTime) => {
	const transitionClass = `transition${transition}Class`;
	element.classList.add(transitionClass);
	await wait(transitionTime ?? 500);
};
const endTransition = async (transition, element) => {
	const transitionClass = `transition${transition}Class`;
	element.classList.remove(transitionClass);
};