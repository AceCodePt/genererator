import { z } from "zod";

export const modelNameParser = z.string();

export type ModelName = z.infer<typeof modelNameParser>;
