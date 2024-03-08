import z from "zod";

export const EstimationMateriauxFormSchema = z.object({
  projetId: z.number(),
  ficheSolutionId: z.number(),
  estimationMateriaux: z.object({ materiauId: z.string().min(1), quantite: z.number().optional() }).array(),
});
export type EstimationMateriauxFormData = z.infer<typeof EstimationMateriauxFormSchema>;
