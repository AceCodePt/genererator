import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { FileTextNotifyExceptions } from "./exceptions";
import { IFileTextTarget } from "./file-text-target.interace";
import { FileTextTargetParameters } from "./types";

export class FsFileTextTarget implements IFileTextTarget {
	async notify({ filePath, fileContent }: FileTextTargetParameters): Promise<void> {
		if (existsSync(filePath)) {
			return;
		}
		// Get the dir of a the file
		const passedPath = path.dirname(filePath);
		// make the directory, recursively.
		await fs.mkdir(passedPath, { recursive: true }).catch((e) => {
			throw new FileTextNotifyExceptions(
				`Failed to create the directories of path ${passedPath} recursivley because of: ${e}`,
			);
		});
		await fs.writeFile(filePath, fileContent).catch((e) => {
			throw new FileTextNotifyExceptions(`Failed to create the file ${filePath} using FS because of: ${e}`);
		});
	}
}
