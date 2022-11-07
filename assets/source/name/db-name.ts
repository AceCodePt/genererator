import { IDbPool } from "@arborknot/db";
import { NameFailedException, NameNotFoundException, NameParseException } from "./exceptions";
import { INameSource } from "./name.interface";
import { Name, NameParameters, nameParser } from "./types";

export class DbName implements INameSource {
	constructor(private readonly db: IDbPool) {}
	async ask(data: NameParameters): Promise<Name> {
		const queryResponse = await this.db
			.query<Name>(
				`
        		`,
				[],
			)
			.catch((e) => {
				throw new NameFailedException(`Failed to retrieve name because of: ${e}`);
			});

		if (!queryResponse.rows[0]) {
			throw new NameNotFoundException(`Failed to find any name`);
		}

		const name = nameParser.parseAsync(queryResponse.rows[0]).catch((e) => {
			throw new NameParseException(`The name received from the DB was malformed because: ${e}`);
		});
		return name;
	}
}
