import z from "zod";
import { CollectiviteFormSchema } from "@/src/forms/collectivite/collectivite-form-schema";

export const UserInfoFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  collectivite: CollectiviteFormSchema,
  poste: z.string().min(1, { message: "Veuillez renseigner votre poste" }),
  nomEtablissement: z.string().min(1, { message: "Veuillez renseigner votre établissement de rattachement" }),
  canalAcquisition: z.string(),
  customCanalAcquisition: z.string(),
  acceptCommunicationProduit: z.boolean(),
  subscribeToNewsletter: z.boolean().optional(),
});
export type UserInfoFormData = z.infer<typeof UserInfoFormSchema>;
