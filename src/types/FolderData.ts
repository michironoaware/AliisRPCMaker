import { FileData } from './FileData';

export interface FolderData {
	/** type of object */
	type: 'folder';
	/** name of the folder */
	id: string;
	/** content of the folder */
	content?: Array<FileData | FolderData> | undefined;
}