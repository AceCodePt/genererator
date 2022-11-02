import inquirer from "inquirer";
import { IFolderCollectionOfFolderSource } from "../../source";
import { IPathToNameValue } from "../../transformer";
import { ModelKindPathFailedException, ModelKindPathParseException } from "./exceptions";
import { IModelKindInput } from "./model-kind.interface";
import { ModelKindPath, ModelKindPathParameter, modelKindPathParser } from "./types";

export class InquirerModelName implements IModelKindInput {
	constructor(
		private readonly folderCollectionOfFolder: IFolderCollectionOfFolderSource,
		private readonly pathToNameValueTransformer: IPathToNameValue,
	) {}

	async run({ assetPath }: ModelKindPathParameter): Promise<ModelKindPath> {
		const modelTypesFolders = await this.folderCollectionOfFolder.ask({ dir: assetPath });
		const modelNameValueArray = this.pathToNameValueTransformer.transform(modelTypesFolders);
		const name = `modelPath`;
		const result = await inquirer
			.prompt({
				name,
				type: "list",
				message: "What type would you want?",
				choices: modelNameValueArray,
			})
			.catch((e) => {
				throw new ModelKindPathFailedException(`Failed to input cli the model kind path because of: ${e}`);
			});

		const modelKindPath = await modelKindPathParser.parseAsync(result[name]).catch((e) => {
			throw new ModelKindPathParseException(
				`The model kind path received from the cli was melformed because of: ${e}`,
			);
		});

		return modelKindPath;
	}
}
