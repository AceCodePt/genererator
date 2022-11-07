import fs from "fs/promises";
import { NameFailedException, NameNotFoundException, NameParseException } from "./exceptions";
import { INameSource } from "./name.interface";
import { Name, NameParameters, nameParser } from "./types";

export class FsFileTextSource implements INameSource {
	async ask(parameters: NameParameters): Promise<Name> {
		const buffer = await fs.readFile(parameters.dir).catch((e) => {
			throw new NameFailedException(`Failed to read the file using FS because of: ${e}`);
		});
		if (buffer.length === 0) {
			throw new NameNotFoundException(`Failed to receive a file with content in it at dir ${parameters.dir}`);
		}
		const fileContent = await nameParser.parseAsync(buffer.toString()).catch((e) => {
			throw new NameParseException(`The file content received from FS is malformed because of: ${e}`);
		});
		return fileContent;
	}
}
