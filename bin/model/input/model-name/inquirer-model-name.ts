import inquirer from "inquirer";
import kebabCase from "lodash.kebabcase";
import { ModelNameFailedException, ModelNameParseException } from "./exceptions";
import { IModelNameInput } from "./model-name.interface";
import { ModelName, modelNameParser } from "./types";

export class InquirerModelName implements IModelNameInput {
	async run(): Promise<ModelName> {
		const result = await inquirer
			.prompt({
				name: "modelName",
				type: "input",
				message: `What is the name?`,
				validate: (input) => input !== "",
				transformer: (input) => kebabCase(input),
			})
			.then((obj) => {
				obj.modelName = kebabCase(obj.modelName);
				return obj;
			})
			.catch((e) => {
				throw new ModelNameFailedException(`Failed to input cli the model name because of: ${e}`);
			});

		const modelName = await modelNameParser.parseAsync(result.modelName).catch((e) => {
			throw new ModelNameParseException(`The model name received from the cli was melformed because of: ${e}`);
		});

		return modelName;
	}
}
