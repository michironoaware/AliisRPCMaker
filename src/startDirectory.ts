import path from 'path';
import fs, { Stats } from 'fs';
import { FileData } from './types/FileData';
import { FolderData } from './types/FolderData';

/** makes a directory and its subdirectories (if they don't exist) based on an object containing FileData and FolderData interfaces */
export function startDirectory(actualPath: string, dir: Array<FileData | FolderData>): void {
	dir.forEach((v) => {
		const p: string = path.join(actualPath, v.id);
		const s: Stats | undefined = fs.lstatSync(p, { throwIfNoEntry: false });
		if(v.type === 'file') {
			if(!s) { fs.writeFileSync(p, v.content ?? ''); }
			else if(s.isDirectory()) {
				fs.rmSync(p);
				fs.writeFileSync(p, v.content ?? '');
			}
		}
		else if(v.type === 'folder') {
			if(!s) { fs.mkdirSync(p); }
			else if(s.isFile()) {
				fs.rmSync(p);
				fs.mkdirSync(p);
			}
			if(v.content) startDirectory(p, v.content);
		}
	});
}