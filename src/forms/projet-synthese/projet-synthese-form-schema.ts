import z from "zod";

export const ProjetSyntheseFormSchema = z.object({
  diagnosticIds: z.string().array().default([]),
  includeAnalyseSimplifiee: z.boolean().default(false),
  solutionIds: z.string().array().default([]),
  estimationId: z.number().optional().nullable(),
  aideIds: z.number().array().default([]),
});

export type ProjetSyntheseFormData = z.infer<typeof ProjetSyntheseFormSchema>;
