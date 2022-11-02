import { ISource } from "../source.interface";
import { folderCollectionOfFolder, FolderCollectionOfFolderInput } from "./types";

export interface IFolderCollectionOfFolderSource
	extends ISource<Promise<folderCollectionOfFolder>, FolderCollectionOfFolderInput> {}
