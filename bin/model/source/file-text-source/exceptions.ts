import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class FileTextNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class FileTextParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class FileTextFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
