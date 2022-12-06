import axios, { AxiosInstance, AxiosError } from "axios";
import { NameFailedException, NameNotFoundException, NameParseException } from "./exceptions";
import { INameSource } from "./name.interface";
import { Name, NameParameters, nameParser } from "./types";

export class AxiosName implements INameSource {
	constructor(private readonly axios: AxiosInstance) {}
	async ask(data: NameParameters): Promise<Name> {
		const response = await this.axios.get(urlToFill).catch((e: Error | AxiosError) => {
			if (axios.isAxiosError(e)) {
				if (e.status && +e.status === 404) {
					throw new NameNotFoundException(`Failed to find any axios name`, { cause: e });
				} else {
					throw new NameFailedException(`Failed to identify the axios error of name`, { cause: e });
				}
			} else {
				throw new NameFailedException(`Failed to retrieve axios name`, { cause: e });
			}
		});

		const name = await nameParser.parseAsync(response.data).catch((e) => {
			throw new NameParseException(`The name received from the axios request was malformed`, { cause: e });
		});
		return name;
	}
}
