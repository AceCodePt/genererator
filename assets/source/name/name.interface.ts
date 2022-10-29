import { ISource } from "../source.interface";
import { Name, NameInput } from "./types";

export interface INameSource extends ISource<Promise<Name>, NameInput> {}
