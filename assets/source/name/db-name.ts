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
				throw new NameFailedException(`Failed to retrieve name from db`, { cause: e });
			});

		if (queryResponse.rowCount === 0) {
			throw new NameNotFoundException(`Failed to find any name in db`);
		}

		const name = await nameParser.parseAsync(queryResponse.rows[0]).catch((e) => {
			throw new NameParseException(`The name received from the DB was malformed`, { cause: e });
		});
		return name;
	}
}
