import { ISource } from "../source.interface";
import { FileTextSource, FileTextSourceInput } from "./types";

export interface IFileTextSource extends ISource<Promise<FileTextSource>, FileTextSourceInput> {}
