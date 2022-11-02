import { InputFailedException, InputParseException } from "../exceptions";

export class ModelKindPathParseException extends InputParseException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelKindPathFailedException extends InputFailedException {
	constructor(message: string) {
		super(message);
	}
}
