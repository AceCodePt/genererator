import { ISource } from "../source.interface";
import { ModelBaseFileCollection, ModelBaseFileCollectionInput } from "./types";

export interface IModelBaseFileCollectionSource
	extends ISource<Promise<ModelBaseFileCollection>, ModelBaseFileCollectionInput> {}
