import inquirer from "inquirer";
import { IFilePathCollectionOfFolderSource } from "../../source";
import { IPathToNameValue } from "../../transformer";
import { ModelKindTypePathFailedException, ModelKindTypePathParseException } from "./exceptions";
import { IModelKindTypePathInput } from "./model-kind-type-path.interface";
import { ModelKindTypePath, ModelKindTypeParameter, modelKindTypePathParser } from "./types";

export class InquirerModelKindTypePathInput implements IModelKindTypePathInput {
	constructor(
		private readonly fileCollectioOfFolderSource: IFilePathCollectionOfFolderSource,
		private readonly pathToNameValueTransformer: IPathToNameValue,
	) {}

	async run({ modelKindPath }: ModelKindTypeParameter): Promise<ModelKindTypePath> {
		const modelTypesFolders = await this.fileCollectioOfFolderSource.ask({ dir: modelKindPath });
		const modelNameValueArray = this.pathToNameValueTransformer.transform(modelTypesFolders);
		const name = `modelKindType`;
		const result = await inquirer
			.prompt({
				name,
				type: "list",
				message: "What type would you want?",
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