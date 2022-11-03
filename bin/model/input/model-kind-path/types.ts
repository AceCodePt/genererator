import { FolderCollectionOfFolder } from "../../../model/source";
import { z } from "zod";

export type ModelKindPathParameter = FolderCollectionOfFolder;

export const modelKindPathParser = z.string();

export type ModelKindPath = z.infer<typeof modelKindPathParser>;
