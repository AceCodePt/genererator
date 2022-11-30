#!/usr/bin/env ts-node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import glob from "glob-promise";
import { InquirerModelKindPath, InquirerModelKindTypePathInput, InquirerModelName } from "./model/input";
import path from "path";
import { argv } from "process";
import { NativePathToNameValue } from "./model/transformer";
import {
	FsFileTextSource,
	GlobFilePathCollectionOfFolderSource,
	GlobFolderCollectionOfFolderSource,
} from "./model/source";
import { FsFileTextTarget } from "./model/target";
import { NativeFileTextToWithName } from "./model/transformer";
import * as url from "url";

// We say that the first argv is the current working dir unless specified otherwise
const projectDir = path.resolve(process.cwd(), argv[2] ?? "./", "./src");
const scriptPath = path.resolve(url.fileURLToPath(new URL(".", import.meta.url)), "../");
const assetPath = path.resolve(scriptPath, "./assets");
clear();
console.log(chalk.green(figlet.textSync("generator", { horizontalLayout: "full" })));
console.log({ projectDir, scriptPath });

async function main() {
	const folderCollectionOfFolder = new GlobFolderCollectionOfFolderSource(glob);
	const filePathCollectionOfFolder = new GlobFilePathCollectionOfFolderSource(glob);
	const pathToNameValue = new NativePathToNameValue();
	const fileTextSource = new FsFileTextSource();
	const fileTextTarget = new FsFileTextTarget();
	const fileTextToNameTransformer = new NativeFileTextToWithName();

	// Get the model types folders
	const modelTypesFolders = await folderCollectionOfFolder.ask({ dir: assetPath });
	const modelKindPath = await new InquirerModelKindPath(pathToNameValue).run(modelTypesFolders);

	//
	const selectedName = await new InquirerModelName().run();

	// Get from the model kind path the file in the path
	const [modelKindTypesFiles, modelKindFiles] = await Promise.all([
		filePathCollectionOfFolder.ask({
			dir: path.resolve(modelKindPath, "./name"),
		}),
		filePathCollectionOfFolder.ask({
			dir: modelKindPath,
		}),
	]);
	const modelKindTypePath = await new InquirerModelKindTypePathInput(pathToNameValue).run(modelKindTypesFiles);
	const projectModelPath = await glob("**/model/", { cwd: projectDir, absolute: true }).then((folders) =>
		path.normalize(folders.find((folder) => folder.includes("src/model")) ?? folders[0]),
	);

	// Remove all the files that contain -name
	const modelKindTypeFilesToCreate = modelKindTypesFiles.filter((path) => !path.includes("-name"));

	// Add the selected file
	modelKindTypeFilesToCreate.push(modelKindTypePath);

	// Run through each file and create it where it belongs
	await Promise.all(
		modelKindTypeFilesToCreate.map(async (assetFilePath) => {
			const fileContentNonCompiled = await fileTextSource.ask({ dir: assetFilePath });
			let fileContent = fileTextToNameTransformer.transform({
				fileText: fileContentNonCompiled,
				findText: "name",
				replaceTextWith: selectedName,
			});

			// /target/name/check
			const relativePathToFile = path
				.normalize(assetFilePath)
				.replace(path.normalize(assetPath), "")
				.replaceAll("name", `${selectedName}`);

			// proj-ex/src/model/target/exceptions.ts
			const projectFilePath = path.join(projectModelPath, relativePathToFile);

			if (projectFilePath.includes("index.ts")) {
				fileContent = `${fileContent}\nexport * from "./${modelKindTypePath
					.split("/")
					.slice(-1)[0]
					.replace("name", selectedName)}"`.replace(".ts", "");
			}

			await fileTextTarget.notify({ filePath: projectFilePath, fileContent });
		}),
	);

	// Run through all the kind files and create them if they don't exist
	await Promise.all(
		modelKindFiles.map(async (assetFilePath) => {
			let fileContent = await fileTextSource.ask({ dir: assetFilePath });

			// /target/exceptions.ts
			const relativePathToFile = path.normalize(assetFilePath).replace(path.normalize(assetPath), "");

			// proj-ex/src/model/target/exceptions.ts
			const projectFilePath = path.join(projectModelPath, relativePathToFile);

			await fileTextTarget.notify({ filePath: projectFilePath, fileContent });
		}),
	);
	process.exit();
}
main();
