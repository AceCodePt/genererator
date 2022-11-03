import { z } from "zod";

export type FileTextSourceInput = {
	dir: string;
};

export const fileTextSourceParser = z.string();
export type FileTextSource = z.infer<typeof fileTextSourceParser>;
