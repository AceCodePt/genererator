import { ITarget } from "../target.interface";
import { FileTextTargetParameters } from "./types";

export interface IFileTextTarget extends ITarget<Promise<void>, FileTextTargetParameters> {}
