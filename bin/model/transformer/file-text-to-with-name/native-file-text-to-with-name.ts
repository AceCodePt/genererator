import kebabCase from "lodash.kebabcase";
import upperFirst from "lodash.upperfirst";
import { IFileTextToWithNameTransformer } from "./file-text-to-with-name.interface";
import { FileTextReplacedName, FileTextToWithNameParametrs } from "./types";

export class NativeFileTextToWithName implements IFileTextToWithNameTransformer {
	transform({ fileText, findText, replaceTextWith }: FileTextToWithNameParametrs): FileTextReplacedName {
		return fileText
			.replaceAll(findText, replaceTextWith)
			.replaceAll(upperFirst(kebabCase(findText)), upperFirst(kebabCase(replaceTextWith)));
	}
}
