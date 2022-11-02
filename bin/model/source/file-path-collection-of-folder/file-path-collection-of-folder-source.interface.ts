import { ISource } from "../source.interface";
import { FilePathCollectionOfFolder, FilePathCollectionOfFolderInput } from "./types";

export interface IFilePathCollectionOfFolderSource
	extends ISource<Promise<FilePathCollectionOfFolder>, FilePathCollectionOfFolderInput> {}
