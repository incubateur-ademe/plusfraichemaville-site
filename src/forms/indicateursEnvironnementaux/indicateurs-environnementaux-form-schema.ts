import z from "zod";

export const IndicateursEnvironnementauxFormSchema = z.object({
  questions: z
    .object({
      code: z.string().min(1),
      quantite: z
        .number({ invalid_type_error: "Champ obligatoire." })
        .nonnegative({ message: "Valeur invalide." }),
    })
    .array(),
});
export type IndicateursEnvironnementauxFormData = z.infer<typeof IndicateursEnvironnementauxFormSchema>;
