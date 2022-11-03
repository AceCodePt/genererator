import { FilePathCollectionOfFolder } from "model/source";
import { z } from "zod";

export type ModelKindTypeParameter = FilePathCollectionOfFolder;
export const modelKindTypePathParser = z.string();

export type ModelKindTypePath = z.infer<typeof modelKindTypePathParser>;
