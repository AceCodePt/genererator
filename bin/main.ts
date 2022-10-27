#!/usr/bin/env ts-node-esm
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import glob from "glob";
import inquirer from "inquirer";
import kebabCase from "lodash.kebabcase";
import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";
import path from "path";
import { argv } from "process";

const scriptPath = path.resolve(argv[1], "../../");
clear();
console.log(chalk.green(figlet.textSync("generator", { horizontalLayout: "full" })));

const result = await inquirer.prompt([
	{
		name: "type",
		type: "list",
		message: "What type would you want?",
		choices: ["source", "target"],
	},
	{
		name: "name",
		type: "input",
		message: (answers) => `What is the ${answers.type} you would like to create?`,
		validate: (input) => input !== "",
		transformer: (input) => kebabCase(input),
	},
	{
		name: "targetType",
		type: "list",
		message: "What type of target would you like?",
		choices: ["db", "axios"],
		when: (answers) => answers.type === "target",
	},
]);

result.name = kebabCase(result.name);
const currDir = process.cwd();

function findOrCreateDir(dir: string, name: string): string {
	const searchedPath = glob.sync(`**/${name}`, { cwd: dir, ignore: ["**/node_modules/**"] })[0] ?? "";
	if (!searchedPath) {
		let newPath = path.join(dir, name);
		mkdirSync(newPath);
		return newPath;
	} else {
		return path.join(dir, searchedPath);
	}
}

function chainFindOrCreateDir(rootDir: string, ...names: string[]): string {
	return names.reduce((newDir, name) => {
		return findOrCreateDir(newDir, name);
	}, rootDir);
}

const currDirName = chainFindOrCreateDir(currDir, "src", "model", result.type, result.name);
const allFilesInType = glob.sync(`./bin/assets/${result.type}/*.ts`);

// Check if all the files in type dir exists else create
allFilesInType.forEach((relativeAssetFilePath) => {
	const fileName = relativeAssetFilePath.split("/").slice(-1)[0];
	const typePath = path.resolve(currDirName, "../");
	const expectedLocation = path.resolve(typePath, fileName);
	if (!existsSync(expectedLocation)) {
		const fullAssetFilePath = path.resolve(scriptPath, relativeAssetFilePath);
		copyFileSync(fullAssetFilePath, expectedLocation);
	}
	if (fileName === "index.ts") {
		appendFileSync(expectedLocation, `\nexport * from "./${result.name}";`);
	}
});

const allFilesInName = glob.sync(`./bin/assets/${result.type}/name/@(${result.targetType}-name|!(*-name|index)).ts`);
let indexFileString = "";

// Create all the files (except index)
allFilesInName.forEach((relativeAssetFilePath) => {
	const fileName = relativeAssetFilePath.split("/").at(-1).replace("name", result.name);
	const typePath = path.resolve(currDirName);
	const expectedLocation = path.resolve(typePath, fileName);
	const fullAssetFilePath = path.resolve(scriptPath, relativeAssetFilePath);
	const expectedFileString = readFileSync(fullAssetFilePath)
		.toString()
		.replaceAll("Name", upperFirst(camelCase(result.name)))
		.replaceAll("name", result.name);
	writeFileSync(expectedLocation, expectedFileString);
	indexFileString += `export * from "./${fileName.replace(".ts", "")}"\n`;
});

writeFileSync(path.resolve(currDirName, "index.ts"), indexFileString);

// Add the index
