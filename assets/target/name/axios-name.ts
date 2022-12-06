import { AxiosInstance } from "axios";
import { NameNotifyException } from "./exceptions";
import { INameTarget } from "./name.interface";
import { NameTargetInput } from "./types";

export class AxiosName implements INameTarget {
	constructor(private readonly axios: AxiosInstance) {}

	async notify(data: NameTargetInput): Promise<void> {
		await this.axios.patch("/name", data).catch((e: Error) => {
			throw new NameNotifyException(`Failed to notify name using axios`, { cause: e });
		});
	}
}
