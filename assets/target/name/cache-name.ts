import { ICache } from "@arborknot/cache";
import { NameNotifyException } from "./exceptions";
import { INameTarget } from "./name.interface";
import { NameTargetInput } from "./types";

export class CacheNameTarget implements INameTarget {
	constructor(private readonly cache: ICache, private readonly ttl?: number) {}
	async notify({}: NameTargetInput): Promise<void> {
		await this.cache.set(key, value, this.ttl).catch((e: Error) => {
			throw new NameNotifyException(`Failed to update name in cache`, { cause: e });
		});
	}
}
