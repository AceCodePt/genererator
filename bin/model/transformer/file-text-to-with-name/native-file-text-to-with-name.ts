import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";
import { IFileTextToWithNameTransformer } from "./file-text-to-with-name.interface";
import { FileTextReplacedName, FileTextToWithNameParametrs } from "./types";

export class NativeFileTextToWithName implements IFileTextToWithNameTransformer {
	transform({ fileText, findText, replaceTextWith }: FileTextToWithNameParametrs): FileTextReplacedName {
		return fileText
			.replaceAll(new RegExp(`${findText}([^A-Za-z])`, "g"), replaceTextWith + "$1")
			.replaceAll(camelCase(findText), camelCase(replaceTextWith))
			.replaceAll(upperFirst(camelCase(findText)), upperFirst(camelCase(replaceTextWith)));
	}
}
