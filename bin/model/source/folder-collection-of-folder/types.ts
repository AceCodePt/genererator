import { z } from "zod";

export type FolderCollectionOfFolderInput = {
	dir: string;
};

// check that the path doesn't contain dot and then transform from full path to folder
export const folderOfFolderParser = z.string().regex(/[^.]/g, "contains a dot");
export type FolderOfFolder = z.infer<typeof folderOfFolderParser>;

export const folderCollectionOfFolderParser = z.array(folderOfFolderParser);
export type folderCollectionOfFolder = z.infer<typeof folderCollectionOfFolderParser>;
