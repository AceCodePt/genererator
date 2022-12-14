import inquirer from "inquirer";
import { IFolderCollectionOfFolderSource } from "../../source";
import { IPathToNameValue } from "../../transformer";
import { ModelKindPathFailedException, ModelKindPathParseException } from "./exceptions";
import { IModelKindInput } from "./model-kind-path.interface";
import { ModelKindPath, ModelKindPathParameter, modelKindPathParser } from "./types";

export class InquirerModelKindPath implements IModelKindInput {
	constructor(private readonly pathToNameValueTransformer: IPathToNameValue) {}

	async run(modelTypesFolders: ModelKindPathParameter): Promise<ModelKindPath> {
		const modelNameValueArray = this.pathToNameValueTransformer.transform(modelTypesFolders);
		const name = `modelPath`;
		const result = await inquirer
			.prompt({
				name,
				type: "list",
				message: "What model type would you want?",
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
