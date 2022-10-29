import { type promise as GlobPromise } from "glob-promise";
import {
	ModelBaseFilesFailedException,
	ModelBaseFilesNotFoundException,
	ModelBaseFilesParseException,
} from "./exceptions";
import { IModelBaseFileCollectionSource as IModelBaseFileCollectionSource } from "./model-base-file-collection.interface";
import { ModelBaseFileCollection, modelBaseFileCollectionParser, ModelBaseFileCollectionInput } from "./types";

/**
 * This class will return an array of paths to files in the dir
 */
export class GlobModelBaseFileCollectionSource implements IModelBaseFileCollectionSource {
	constructor(private readonly glob: typeof GlobPromise) {}
	async ask({ fatherAssetDir: cwd, modelType }: ModelBaseFileCollectionInput): Promise<ModelBaseFileCollection> {
		const globPattern = `**/assets/${modelType}/*`;
		// Search directly under model type for files
		const data: unknown = await this.glob(globPattern, { cwd, absolute: true, nodir: true }).catch((e) => {
			throw new ModelBaseFilesFailedException(
				`Failed to retrieve the model base files from glob ${globPattern} in dir ${cwd} because of ${e}`,
			);
		});

		const folders = await modelBaseFileCollectionParser.parseAsync(data).catch((e) => {
			throw new ModelBaseFilesParseException(
				`The model base files received from glob ${globPattern} in dir ${cwd} is malformed. ${e}`,
			);
		});

		if (!folders.length) {
			throw new ModelBaseFilesNotFoundException(
				`Couldn't find any model base files from glob ${globPattern} in in the dir ${cwd}`,
			);
		}

		return folders;
	}
}
