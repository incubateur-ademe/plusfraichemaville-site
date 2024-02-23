import z from "zod";
import { validateRegistrationNumber } from "@/lib/siren/sirenHelper";

export const UserInfoFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  siret: z
    .string()
    .min(1, { message: "Veuillez renseigner le SIRET de votre collectivité" })
    .length(14, { message: "Le numéro SIRET doit comporter 14 chiffres" })
    .refine(validateRegistrationNumber, { message: "Ce numéro de SIRET n'est pas valide" }),
  collectivite: z.string().min(1, { message: "Veuillez renseigner votre collectivité" }),
  codePostal: z.string().min(1, { message: "Veuillez renseigner le code postal de votre collectivité" }),
  poste: z.string().min(1, { message: "Veuillez renseigner votre poste" }),
});
export type UserInfoFormData = z.infer<typeof UserInfoFormSchema>;
