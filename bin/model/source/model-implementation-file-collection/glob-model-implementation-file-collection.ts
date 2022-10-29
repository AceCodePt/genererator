import { type promise as GlobPromise } from "glob-promise";
import { ModelFoldersFailedException, ModelFoldersNotFoundException, ModelFoldersParseException } from "./exceptions";
import { IModelImplementationFileCollection as IModelImplementationFileCollection } from "./model-implementaion-file-collection.interface";
import {
	ModelImplementationFileCollection,
	modelImplementationFileCollectionParser,
	ModelImplementationFileCollectionInput,
} from "./types";

export class GlobModelImplementationFileCollectionSource implements IModelImplementationFileCollection {
	constructor(private readonly glob: typeof GlobPromise) {}
	async ask({
		fatherAssetDir: cwd,
		modelType,
	}: ModelImplementationFileCollectionInput): Promise<ModelImplementationFileCollection> {
		const data: unknown = await this.glob(`**/assets/${modelType}/name/*`, {
			cwd,
			absolute: true,
			nodir: true,
		}).catch((e) => {
			throw new ModelFoldersFailedException(
				`Failed to retrieve the model implementaion files in dir ${cwd} because of ${e}`,
			);
		});

		const implementaionFiles = await modelImplementationFileCollectionParser.parseAsync(data).catch((e) => {
			throw new ModelFoldersParseException(
				`The model implementation files received from glob in dir ${cwd} is malformed. ${e}`,
			);
		});

		if (!implementaionFiles.length) {
			throw new ModelFoldersNotFoundException(`Couldn't find any model implementation files in the dir ${cwd}`);
		}

		return implementaionFiles;
	}
}
