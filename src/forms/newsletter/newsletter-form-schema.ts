import z from "zod";
import { CollectiviteFormSchema } from "@/src/forms/collectivite/collectivite-form-schema";

export const NewsletterFormSchema = z.object({
  email: z.string().min(1, { message: "Veuillez renseigner votre email" }).email("Merci de renseigner un email valide"),
  collectivite: CollectiviteFormSchema.nullish(),
});
export type NewsletterFormData = z.infer<typeof NewsletterFormSchema>;
