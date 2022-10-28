import { ISource } from "../source.interface";
import { ModelFolderCollection, ModelFoldersInput } from "./types";

export interface IModelFolderCollectionSource extends ISource<Promise<ModelFolderCollection>, ModelFoldersInput> {}
