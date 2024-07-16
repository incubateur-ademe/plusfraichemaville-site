import z from "zod";
import { RoleProjet } from "@prisma/client"; // Assurez-vous que le chemin d'importation est correct

export const PartageUserInvitationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Veuillez renseigner une adresse email" })
    .email("Merci de renseigner un email valide"),
  role: z.nativeEnum(RoleProjet),
});

export type PartageUserInvitationData = z.infer<typeof PartageUserInvitationSchema>;
