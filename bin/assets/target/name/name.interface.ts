import { ITarget } from "../target.interface";
import { NameTargetInput } from "./types";

export interface INameTarget extends ITarget<Promise<void>, NameTargetInput> {}
