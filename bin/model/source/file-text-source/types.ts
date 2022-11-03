import { z } from "zod";

export type FileTextSourceInput = {
	dir: string;
};

export const fileTextParser = z.string();
export type FileText = z.infer<typeof fileTextParser>;
