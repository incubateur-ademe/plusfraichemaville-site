import z from "zod";

export const EstimationMateriauxFormSchema = z.object({
  ficheSolutionId: z.number(),
  globalPrice: z
    .object({
      fourniture: z
        .object({
          min: z.number().nonnegative().optional(),
          max: z.number().nonnegative().optional(),
        })
        .optional(),
      entretien: z
        .object({
          min: z.number().nonnegative().optional(),
          max: z.number().nonnegative().optional(),
        })
        .optional(),
    })
    .optional(),
  estimationMateriaux: z
    .object({
      materiauId: z.string().min(1),
      quantite: z
        .number({ invalid_type_error: "Veuillez rentrer une valeur pour la quantité." })
        .nonnegative({ message: "Veuillez rentrer une valeur cohérente pour la quantité." }),
    })
    .array(),
});
export type EstimationMateriauxFormData = z.infer<typeof EstimationMateriauxFormSchema>;
