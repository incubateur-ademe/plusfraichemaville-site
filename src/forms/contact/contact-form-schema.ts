import z from "zod";
import { CollectiviteFormSchema } from "@/src/forms/collectivite/collectivite-form-schema";

export const ContactFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  telephone: z.string(),
  objetMessage: z.string().min(1, { message: "Veuillez sélectionner l'objet de votre message" }),
  message: z.string().min(1, { message: "Veuillez écrire un message" }),
  subscribeToNewsletter: z.boolean(),
  collectivite: CollectiviteFormSchema.nullish()
});
export type ContactFormData = z.infer<typeof ContactFormSchema>;
