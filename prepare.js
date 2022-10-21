const fs = require('fs');
const path = require('path');
const buildPath = path.join(__dirname, 'build');
const minify = require('@node-minify/core');
const html = require('@node-minify/html-minifier');
const css = require('@node-minify/clean-css');
const js = require('@node-minify/uglify-js');

async function recursiveMinify(p) {
	const s = fs.lstatSync(p, { throwIfNoEntry: false });
	if(s.isDirectory()) {
		const d = fs.readdirSync(p, { encoding: 'utf8' });
		d.forEach(dp => recursiveMinify(path.join(p, dp)));
	}
	else if(s.isFile()) {
		let compressor;
		if(p.endsWith('.html')) compressor = html;
		else if(p.endsWith('.css')) compressor = css;
		else if(p.endsWith('.js') || p.endsWith('.mjs') || p.endsWith('.cjs')) compressor = js;
		try {
			if(compressor) await minify({
				compressor,
				input: p,
				output: p,
			});
		} catch(e) {}
	}
}

const start = Date.now();
recursiveMinify(buildPath);
const end = Date.now();
console.log(`Done in ${end - start}ms.`);

if(process.argv.find(v => v === '--watch' || v === '-w')) {
	console.log('Watching for changes.');
	let last = 0;
	fs.watch(path.join(__dirname, 'src'), {
		persistent: true,
		recursive: true,
	}, async (t, p) => {
		try {
			const start = Date.now();
			if(start - last < 250) return;
			const build = path.join(__dirname, 'build', p);
			let compressor;
			if(p.endsWith('.html')) compressor = html;
			else if(p.endsWith('.css')) compressor = css;
			else if(p.endsWith('.js') || p.endsWith('.mjs') || p.endsWith('.cjs')) compressor = js;
			try {
				if(compressor) setTimeout(async () => await minify({
					compressor,
					input: build,
					output: build,
				}), 100);
			} catch(e) { console.error(e); }
			const end = Date.now();
			last = end;
			console.log(`Done in ${end - start}ms.`);
		} catch(e) { console.error(e); }
	});
}