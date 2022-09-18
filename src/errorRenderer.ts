const errorPathElement: HTMLElement = document.getElementById('errorPath')!;
errorPathElement.textContent = errorPath;
errorPathElement.addEventListener('click', openLogFolder());
