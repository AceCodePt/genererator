import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class NameNotFoundException extends SourceNotFoundException {
	constructor(message: string) {
		super(message);
	}
}

export class NameParseException extends SourceParseException {
	constructor(message: string) {
		super(message);
	}
}

export class NameFailedException extends SourceFailedException {
	constructor(message: string) {
		super(message);
	}
}
