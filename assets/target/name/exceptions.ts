import { TargetNotifyException } from "../exceptions";

export class NameNotifyException extends TargetNotifyException {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}
