export interface FileData {
	/** type of object. */
	type: 'file';
	/** name of the file, extension included. */
	id: string;
	/** content of the file */
	content?: string | Buffer | undefined;
}