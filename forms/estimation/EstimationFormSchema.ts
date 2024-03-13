import z from "zod";

export const EstimationFormSchema = z.object({ ficheSolutionIds: z.string().array() });
export type EstimationFormData = z.infer<typeof EstimationFormSchema>;
