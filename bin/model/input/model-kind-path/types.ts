import { z } from "zod";

export type ModelKindPathParameter = {
	assetPath: string;
};

export const modelKindPathParser = z.string();

export type ModelKindPath = z.infer<typeof modelKindPathParser>;
