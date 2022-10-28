import { type promise as GlobPromise } from "glob-promise";
import { ModelFoldersFailedException, ModelFoldersNotFoundException, ModelFoldersParseException } from "./exceptions";
import { IModelFolderCollectionSource as IModelFolderCollectionSource } from "./model-folder-collection.interface";
import { ModelFolderCollection, modelFolderCollectionParser, ModelFoldersInput } from "./types";

export class GlobModelFolderCollectionSource implements IModelFolderCollectionSource {
	constructor(private readonly glob: typeof GlobPromise) {}
	async ask({ fatherAssetDir: cwd }: ModelFoldersInput): Promise<ModelFolderCollection> {
		// Search directly under the asset folder the folders
		const data: unknown = await this.glob("/**/assets/!(*.*)", { cwd }).catch((e) => {
			throw new ModelFoldersFailedException(`Failed to retrieve the model folders in dir ${cwd} because of ${e}`);
		});

		const folders = await modelFolderCollectionParser.parseAsync(data).catch((e) => {
			throw new ModelFoldersParseException(`The data received from glob in dir ${cwd} is malformed. ${e}`);
		});

		if (!folders.length) {
			throw new ModelFoldersNotFoundException(`Couldn't find any folder in the dir ${cwd}`);
		}

		return folders;
	}
}
