import z from "zod";

export const UserInfoFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  collectivite: z.object(
    {
      banId: z.string(),
      nomCollectivite: z.string(),
      codeInsee: z.string(),
    },
    {
      invalid_type_error: "Collectivité renseignée non reconnue",
      required_error: "Veuillez renseigner la collectivité à laquelle vous êtes rattaché",
    },
  ),
  poste: z.string().min(1, { message: "Veuillez renseigner votre poste" }),
});
export type UserInfoFormData = z.infer<typeof UserInfoFormSchema>;
