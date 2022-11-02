import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class FilePathCollectionOfFloderNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class FilePathCollectionOfFolderParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class FilePathCollectionOfFolderFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
