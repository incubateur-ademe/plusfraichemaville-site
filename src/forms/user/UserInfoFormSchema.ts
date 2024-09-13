import z from "zod";
import { CollectiviteFormSchema } from "@/forms/collectivite/collectivite-form-schema";

export const UserInfoFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  collectivite: CollectiviteFormSchema,
  poste: z.string().min(1, { message: "Veuillez renseigner votre poste" }),
  canalAcquisition: z.string(),
  customCanalAcquisition: z.string(),
});
export type UserInfoFormData = z.infer<typeof UserInfoFormSchema>;
