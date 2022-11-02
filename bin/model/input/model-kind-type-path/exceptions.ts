import { InputFailedException, InputParseException } from "../exceptions";

export class ModelKindTypePathParseException extends InputParseException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelKindTypePathFailedException extends InputFailedException {
	constructor(message: string) {
		super(message);
	}
}
