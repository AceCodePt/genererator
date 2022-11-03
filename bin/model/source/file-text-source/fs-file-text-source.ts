import { IFileTextSource } from "./file-text-source.interface";
import { FileText, fileTextParser, FileTextSourceInput } from "./types";
import fs from "fs/promises";
import { FileTextFailedException, FileTextNotFoundException, FileTextParseException } from "./exceptions";

export class FsFileTextSource implements IFileTextSource {
	async ask({ dir }: FileTextSourceInput): Promise<FileText> {
		const buffer = await fs.readFile(dir).catch((e) => {
			throw new FileTextFailedException(`Failed to read the file using FS because of: ${e}`);
		});
		if (buffer.length === 0) {
			throw new FileTextNotFoundException(`Failed to receive a file with content in it at dir ${dir}`);
		}
		const fileContent = await fileTextParser.parseAsync(buffer.toString()).catch((e) => {
			throw new FileTextParseException(`The file content received from FS is malformed because of: ${e}`);
		});
		return fileContent;
	}
}
