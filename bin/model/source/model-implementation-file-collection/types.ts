import { z } from "zod";

export type ModelImplementationFileCollectionInput = {
	cwd: string;
};

// check that the path doesn't contain dot and then transform from full path to folder
export const modelImplementationFileParser = z.string().regex(/[.]/g, "doesn't contains a dot");
export type ModelImplementationFile = z.infer<typeof modelImplementationFileParser>;

export const modelImplementationFileCollectionParser = z.array(modelImplementationFileParser);
export type ModelImplementationFileCollection = z.infer<typeof modelImplementationFileCollectionParser>;
