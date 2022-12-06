import { SourceNotFoundException, SourceParseException, SourceFailedException } from "../exceptions";

export class NameNotFoundException extends SourceNotFoundException {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}

export class NameParseException extends SourceParseException {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}

export class NameFailedException extends SourceFailedException {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}
