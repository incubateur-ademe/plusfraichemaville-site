import z from "zod";
import { CollectiviteFormSchema } from "@/forms/collectivite/collectivite-form-schema";
import { GeoJsonProperties } from "geojson";

export const ProjetInfoFormSchema = z.object({
  projetId: z.number().optional(),
  nom: z.string().min(1, { message: "Veuillez renseigner le nom du projet" }),
  typeEspace: z.string().min(1, { message: "Veuillez renseigner l'espace sur lequel vous souhaitez agir" }),
  adresse: z
    .object(
      {
        label: z.string().optional(),
        banInfo: z.any().optional(),
      },
      { invalid_type_error: "Le format de votre adresse est invalide." },
    )
    .optional(),
  niveauMaturite: z.string().min(1, { message: "Veuillez sélectionner le niveau de maturité de votre projet" }),
  dateEcheance: z
    .string()
    .min(1, { message: "Veuillez renseigner la date d'échéance souhaitée" })
    .regex(new RegExp("[0-9]{4}-(0?[1-9]|1[012])$"), { message: "Veuillez rentrer une date au format YYYY-MM" }),
  collectivite: CollectiviteFormSchema,
});
export type ProjetInfoFormData = z.infer<typeof ProjetInfoFormSchema>;
