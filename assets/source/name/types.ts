import { z } from "zod";

export type NameParameters = {};

export const nameParser = z.object({});

export type Name = z.infer<typeof nameParser>;
