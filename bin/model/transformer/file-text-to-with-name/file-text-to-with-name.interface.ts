import { ITransformer } from "../transformer.interface";
import { FileTextReplacedName, FileTextToWithNameParametrs } from "./types";

export interface IFileTextToWithNameTransformer
	extends ITransformer<FileTextToWithNameParametrs, FileTextReplacedName> {}
