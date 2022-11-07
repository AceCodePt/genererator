import { ISource } from "../source.interface";
import { Name, NameParameters } from "./types";

export interface INameSource extends ISource<Promise<Name>, NameParameters> {}
