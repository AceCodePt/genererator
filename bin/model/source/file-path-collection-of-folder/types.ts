import { z } from "zod";

export type FilePathCollectionOfFolderInput = {
	dir: string;
};

export const filePathOfFolderParser = z.string();
export type FilePathOfFolder = z.infer<typeof filePathOfFolderParser>;

export const filePathCollectionOfFolderParser = z.array(filePathOfFolderParser);
export type FilePathCollectionOfFolder = z.infer<typeof filePathCollectionOfFolderParser>;
