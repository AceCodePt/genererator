export class InputParseException extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class InputFailedException extends Error {
	constructor(message: string) {
		super(message);
	}
}
