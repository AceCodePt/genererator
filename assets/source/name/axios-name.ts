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
					throw new NameNotFoundException(`Failed to find any axios name. The error presented: ${e}`);
				} else {
					throw new NameFailedException(
						`Failed to identify the axios error of name. The error presented: ${e}`,
					);
				}
			} else {
				throw new NameFailedException(`Failed to retrieve axios name because of: ${e}`);
			}
		});

		const name = await nameParser.parseAsync(response.data).catch((e) => {
			throw new NameParseException(`The name received from the axios request was malformed because: ${e}`);
		});
		return name;
	}
}
