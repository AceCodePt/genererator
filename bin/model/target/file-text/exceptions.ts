import { TargetNotifyException } from "../exceptions";

export class FileTextNotifyExceptions extends TargetNotifyException {
	constructor(message: string) {
		super(message);
	}
}
