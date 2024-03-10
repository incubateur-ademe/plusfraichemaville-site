import z from "zod";

export const EstimationMateriauxFormSchema = z.object({
  ficheSolutionId: z.number(),
  estimationMateriaux: z
    .object({
      estimationId: z.number(),
      materiauId: z.string().min(1),
      quantite: z
        .number({ invalid_type_error: "Veuillez rentrer une valeur pour la quantité." })
        .nonnegative({ message: "Veuillez rentrer une valeur cohérente pour la quantité." })
        .optional(),
    })
    .array(),
});
export type EstimationMateriauxFormData = z.infer<typeof EstimationMateriauxFormSchema>;
