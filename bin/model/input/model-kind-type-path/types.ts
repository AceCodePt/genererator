import { z } from "zod";

export type ModelKindTypeParameter = {
	modelKindPath: string;
};

export const modelKindTypePathParser = z.string();

export type ModelKindTypePath = z.infer<typeof modelKindTypePathParser>;
