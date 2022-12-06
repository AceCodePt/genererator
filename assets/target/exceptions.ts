export class TargetNotifyException extends Error {
	constructor(message: string, errorOptions?: ErrorOptions) {
		super(message, errorOptions);
	}
}
