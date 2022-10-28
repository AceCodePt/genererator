import { z } from "zod";

export type ModelBaseFileCollectionInput = {
	fatherAssetDir: string;
	modelType: string;
};

// Check if the file contains at least dot
export const modelBaseFileParser = z.string().regex(/\.(?=[A-Za-z])/g, "doesn't contain a dot");
export type ModelBaseFile = z.infer<typeof modelBaseFileParser>;

export const modelBaseFileCollectionParser = z.array(modelBaseFileParser);
export type ModelBaseFileCollection = z.infer<typeof modelBaseFileCollectionParser>;
