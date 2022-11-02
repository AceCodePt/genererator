import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class FolderCollectionOfFloderNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class FolderCollectionOfFolderParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class FolderCollectionOfFolderFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
