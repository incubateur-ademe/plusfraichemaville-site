import z from "zod";

export const EstimationMateriauxFormSimpleFieldSchema = z.object({
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
  quantite: z
    .number({ invalid_type_error: "Veuillez rentrer une valeur pour la quantité." })
    .nonnegative({ message: "Veuillez rentrer une valeur cohérente pour la quantité." }),
  coutInvestissementOverride: z.number({ invalid_type_error: "Veuillez rentrer une valeur." }).nonnegative().optional(),
  coutEntretienOverride: z.number({ invalid_type_error: "Veuillez rentrer une valeur." }).nonnegative().optional(),
});
export type EstimationMateriauxSimpleFieldFormData = z.infer<typeof EstimationMateriauxFormSimpleFieldSchema>;
