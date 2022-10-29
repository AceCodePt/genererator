import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class ModelFoldersNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelFoldersParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelFoldersFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
