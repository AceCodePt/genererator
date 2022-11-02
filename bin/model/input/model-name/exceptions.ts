import { InputFailedException, InputParseException } from "../exceptions";

export class ModelNameParseException extends InputParseException {
	constructor(message: string) {
		super(message);
	}
}

export class ModelNameFailedException extends InputFailedException {
	constructor(message: string) {
		super(message);
	}
}
