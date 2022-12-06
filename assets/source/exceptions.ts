export class SourceNotFoundException extends Error {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}

export class SourceParseException extends Error {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}

export class SourceFailedException extends Error {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}
