import z from "zod";

export const UserInfoFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  nom: z.string().min(1, { message: "Veuillez renseigner votre nom" }),
  prenom: z.string().min(1, { message: "Veuillez renseigner votre prénom" }),
  // collectivite: z.string().min(1, { message: "Veuillez renseigner votre collectivité" }),
  poste: z.string().min(1, { message: "Veuillez renseigner votre poste" }),
});
export type UserInfoFormData = z.infer<typeof UserInfoFormSchema>;
