import { type promise as GlobPromise } from "glob-promise";
import {
	FilePathCollectionOfFloderNotFoundException,
	FilePathCollectionOfFolderFailedException,
	FilePathCollectionOfFolderParseException,
} from "./exceptions";
import { IFilePathCollectionOfFolderSource as IFilePathCollectionOfFolderSource } from "./file-path-collection-of-folder-source.interface";
import { FilePathCollectionOfFolder, filePathCollectionOfFolderParser, FilePathCollectionOfFolderInput } from "./types";

export class GlobFilePathCollectionOfFolderSource implements IFilePathCollectionOfFolderSource {
	constructor(private readonly glob: typeof GlobPromise) {}
	async ask({ dir }: FilePathCollectionOfFolderInput): Promise<FilePathCollectionOfFolder> {
		// Search directly under the asset folder the folders
		const globQuery = "*";
		const data: unknown = await this.glob(globQuery, { absolute: true, cwd: dir, nodir: true }).catch((e) => {
			throw new FilePathCollectionOfFolderFailedException(
				`Failed to retrieve the file path collection in dir ${dir} because of ${e}`,
			);
		});

		const folders = await filePathCollectionOfFolderParser.parseAsync(data).catch((e) => {
			throw new FilePathCollectionOfFolderParseException(
				`The file path received from glob in dir ${dir} is malformed. ${e}`,
			);
		});

		if (!folders.length) {
			throw new FilePathCollectionOfFloderNotFoundException(
				`Couldn't find any file path in the dir ${dir} for glob query ${globQuery}`,
			);
		}

		return folders;
	}
}
