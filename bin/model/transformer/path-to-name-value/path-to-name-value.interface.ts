import { ITransformer } from "../transformer.interface";

export interface IPathToNameValue extends ITransformer<string[], { name: string; value: string }[]> {}
