import { ISource } from "../source.interface";
import { ModelImplementationFileCollection, ModelImplementationFileCollectionInput } from "./types";

export interface IModelImplementationFileCollection
	extends ISource<Promise<ModelImplementationFileCollection>, ModelImplementationFileCollectionInput> {}
