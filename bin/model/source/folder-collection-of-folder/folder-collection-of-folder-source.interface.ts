import { ISource } from "../source.interface";
import { FolderCollectionOfFolder, FolderCollectionOfFolderInput } from "./types";

export interface IFolderCollectionOfFolderSource
	extends ISource<Promise<FolderCollectionOfFolder>, FolderCollectionOfFolderInput> {}
