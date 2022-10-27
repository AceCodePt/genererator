import { z } from "zod";

export type NameInput = {};

export const nameParser = z.object({});

export type Name = z.infer<typeof nameParser>;
