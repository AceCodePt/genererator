#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import glob from "glob-promise";
import { InquirerModelKindPath, InquirerModelKindTypePathInput, InquirerModelName } from "./model/input";
import path from "path";
import { argv } from "process";
import { NativePathToNameValue } from "./model/transformer";
import { GlobFilePathCollectionOfFolderSource, GlobFolderCollectionOfFolderSource } from "./model/source";

// We say that the first argv is the current working dir unless specified otherwise
const currDir = path.resolve(process.cwd(), argv[2] ?? "./");
const scriptPath = path.resolve(argv[1], "../../");
clear();
console.log(chalk.green(figlet.textSync("generator", { horizontalLayout: "full" })));

async function main() {
	const folderCollectionOfFolder = new GlobFolderCollectionOfFolderSource(glob);
	const filePathCollectionOfFolder = new GlobFilePathCollectionOfFolderSource(glob);
	const pathToNameValue = new NativePathToNameValue();
	const assetPath = path.resolve(scriptPath, "./assets");
	const modelKindPath = await new InquirerModelKindPath(folderCollectionOfFolder, pathToNameValue).run({
		assetPath,
	});
	const selectedName = await new InquirerModelName().run();
	const modelKindTypePath = await new InquirerModelKindTypePathInput(filePathCollectionOfFolder, pathToNameValue).run(
		{ modelKindPath },
	);
	console.log(modelKindPath, selectedName, modelKindTypePath);
}
main();
