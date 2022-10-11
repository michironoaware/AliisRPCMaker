import path from 'path';
import fs, { Stats } from 'fs';

export interface FileData {
	type: 'file';
	id: string;
	content?: string | Buffer;
}
export interface FolderData {
	type: 'folder';
	id: string;
	content?: Array<FileData | FolderData>;
}

export namespace Directory {
	export function init(actualPath: string, dir: Array<FileData | FolderData>): void {
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
				if(v.content) init(p, v.content);
			}
		});
	}
}