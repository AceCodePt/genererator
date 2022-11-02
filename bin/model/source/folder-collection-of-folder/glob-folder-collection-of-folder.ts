import { type promise as GlobPromise } from "glob-promise";
import {
	FolderCollectionOfFloderNotFoundException,
	FolderCollectionOfFolderFailedException,
	FolderCollectionOfFolderParseException,
} from "./exceptions";
import { IFolderCollectionOfFolderSource as IFolderCollectionOfFolderSource } from "./folder-collection-of-folder-source.interface";
import { folderCollectionOfFolder, folderCollectionOfFolderParser, FolderCollectionOfFolderInput } from "./types";

export class GlobFolderCollectionOfFolderSource implements IFolderCollectionOfFolderSource {
	constructor(private readonly glob: typeof GlobPromise) {}
	async ask({ dir }: FolderCollectionOfFolderInput): Promise<folderCollectionOfFolder> {
		// Search directly under the asset folder the folders
		const globQuery = "*/";
		const data: unknown = await this.glob(globQuery, { absolute: true, cwd: dir }).catch((e) => {
			throw new FolderCollectionOfFolderFailedException(
				`Failed to retrieve the model folders in dir ${dir} because of ${e}`,
			);
		});

		const folders = await folderCollectionOfFolderParser.parseAsync(data).catch((e) => {
			throw new FolderCollectionOfFolderParseException(
				`The data received from glob in dir ${dir} is malformed. ${e}`,
			);
		});

		if (!folders.length) {
			throw new FolderCollectionOfFloderNotFoundException(
				`Couldn't find any folder in the dir ${dir} for glob query ${globQuery}`,
			);
		}

		return folders;
	}
}
