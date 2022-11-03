import { ISource } from "../source.interface";
import { FileText, FileTextSourceInput } from "./types";

export interface IFileTextSource extends ISource<Promise<FileText>, FileTextSourceInput> {}
