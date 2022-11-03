import fs from "fs/promises";
import { FileTextNotifyExceptions } from "./exceptions";
import { IFileTextTarget } from "./file-text-target.interace";
import { FileTextTargetParameters } from "./types";

export class FsFileTextTarget implements IFileTextTarget {
	async notify({ filePath, fileContent }: FileTextTargetParameters): Promise<void> {
		await fs.writeFile(filePath, fileContent).catch((e) => {
			throw new FileTextNotifyExceptions(`Failed to create the file ${filePath} using FS because of: ${e}`);
		});
	}
}
