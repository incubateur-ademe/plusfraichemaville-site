import z from "zod";

export const CollectiviteFormSchema = z.object(
  {
    id: z.number().optional(),
    banId: z.string(),
    nomCollectivite: z.string(),
    codeInsee: z.string(),
  },
  {
    invalid_type_error: "Collectivité renseignée non reconnue",
    required_error: "Veuillez renseigner la collectivité à laquelle vous êtes rattaché",
  },
);

export type CollectiviteFormData = z.infer<typeof CollectiviteFormSchema>;
