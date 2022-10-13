const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const inPath = path.join(__dirname, 'src');
const outPath = path.join(__dirname, 'build');

const start = Date.now();
fse.copySync(inPath, outPath, {
	overwrite: true,
	filter: i => (
		!i.endsWith('.ts') &&
		!i.endsWith('.cts') &&
		!i.endsWith('.mts') &&
		!i.includes('input.css')
	)
});
const end = Date.now();
console.log(`Done in ${end - start}ms.`);

if(process.argv.find(v => v === '--watch' || v === '-W')) {
	console.log('Watching for changes.');
	let last = 0;
	fs.watch(inPath, {
		persistent: true,
		recursive: true,
	}, (t, p) => {
		const start = Date.now();
		if(start - last < 250) return;
		fse.copySync(inPath, outPath, {
			overwrite: true,
			filter: i => (
				!i.endsWith('.ts') &&
				!i.endsWith('.cts') &&
				!i.endsWith('.mts') &&
				!i.includes('input.css')
			)
		});
		const end = Date.now();
		last = end;
		console.log(`Done in ${end - start}ms.`);
	});
}