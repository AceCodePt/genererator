import { z } from "zod";

export type ModelFoldersInput = {
	fatherAssetDir: string;
};

// check that the path doesn't contain dot and then transform from full path to folder
export const modelFolderParser = z.string().regex(/[^.]/g, "contains a dot");
export type ModelFolder = z.infer<typeof modelFolderParser>;

export const modelFolderCollectionParser = z.array(modelFolderParser);
export type ModelFolderCollection = z.infer<typeof modelFolderCollectionParser>;
