import { IDbPool } from "@arborknot/db";
import { NameNotifyException } from "./exceptions";
import { INameTarget } from "./name.interface";
import { NameTargetInput } from "./types";

export class DbNameTarget implements INameTarget {
	constructor(private readonly db: IDbPool) {}
	async notify(params: NameTargetInput): Promise<void> {
		await this.db
			.query<unknown>(
				`

            `,
				[],
			)
			.catch((e: Error) => {
				throw new NameNotifyException(`Failed to update name to db`, { cause: e });
			});
	}
}
