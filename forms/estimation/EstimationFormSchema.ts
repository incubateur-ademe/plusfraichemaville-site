import z from "zod";

export const EstimationFormSchema = z.object({
  ficheSolutionIds: z.string().array().min(1, { message: "Vous devez sélectionner au moins une fiche solution" }),
});
export type EstimationFormData = z.infer<typeof EstimationFormSchema>;
