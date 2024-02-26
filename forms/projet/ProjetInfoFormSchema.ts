import z from "zod";

export const ProjetInfoFormSchema = z.object({
  projetId: z.bigint().optional(),
  nom: z.string().min(1, { message: "Veuillez renseigner le nom du projet" }),
  typeEspace: z.string().min(1, { message: "Veuillez renseigner l'espace sur lequel vous souhaitez agir" }),
  adresse: z.string().optional(),
  dateEcheance: z
    .string()
    .min(1, { message: "Veuillez renseigner la date d'échéance souhaitée" })
    .regex(new RegExp("[0-9]{4}-(0?[1-9]|1[012])$"), { message: "Veuillez rentrer une date au format YYYY-MM" }),
});
export type ProjetInfoFormData = z.infer<typeof ProjetInfoFormSchema>;
