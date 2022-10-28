import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class ModelBaseFilesNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelBaseFilesParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelBaseFilesFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
