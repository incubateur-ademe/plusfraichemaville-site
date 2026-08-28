import z from "zod";

export const ProjetSyntheseFormSchema = z.object({
  solutionIds: z.string().array().default([]),
});

export type ProjetSyntheseFormData = z.infer<typeof ProjetSyntheseFormSchema>;
