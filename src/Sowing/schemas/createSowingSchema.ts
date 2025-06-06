import { z } from "zod";

export const createSowingSchema = z.object({
  description: z.string(),
  hectares: z
    .number({ invalid_type_error: "Required" })
    .positive("mustBePositive"),
});

export type CreateSowingSchema = z.infer<typeof createSowingSchema>;

export default createSowingSchema;
