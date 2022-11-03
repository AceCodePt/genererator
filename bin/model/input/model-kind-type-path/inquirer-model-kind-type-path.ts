import inquirer from "inquirer";
import path from "path";
import { IFilePathCollectionOfFolderSource } from "../../source";
import { IPathToNameValue } from "../../transformer";
import { ModelKindTypePathFailedException, ModelKindTypePathParseException } from "./exceptions";
import { IModelKindTypePathInput } from "./model-kind-type-path.interface";
import { ModelKindTypePath, ModelKindTypeParameter, modelKindTypePathParser } from "./types";

export class InquirerModelKindTypePathInput implements IModelKindTypePathInput {
	constructor(private readonly pathToNameValueTransformer: IPathToNameValue) {}

	async run(modelTypesFolders: ModelKindTypeParameter): Promise<ModelKindTypePath> {
		modelTypesFolders = modelTypesFolders
			.filter((path) => path.includes("-name"))
			.map((path) => path.replace("-name.ts", ""));

		const modelNameValueArray = this.pathToNameValueTransformer.transform(modelTypesFolders);
		const name = `modelKindType`;
		const result = await inquirer
			.prompt({
				name,
				type: "list",
				message: "What model kind would you want?",
				choices: modelNameValueArray,
			})
			.catch((e) => {
				throw new ModelKindTypePathFailedException(
					`Failed to input cli the model kind type path because of: ${e}`,
				);
			});

		const modelKindType = await modelKindTypePathParser.parseAsync(result[name]).catch((e) => {
			throw new ModelKindTypePathParseException(
				`The model kind type path received from the cli was melformed because of: ${e}`,
			);
		});

		return modelKindType;
	}
}
