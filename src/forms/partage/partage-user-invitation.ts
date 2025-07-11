import z from "zod";
import { RoleProjet } from "@/src/generated/prisma/client";

export const PartageUserInvitationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Veuillez renseigner une adresse email" })
    .email("Merci de renseigner un email valide"),
  role: z.nativeEnum(RoleProjet).refine((role) => role === RoleProjet.LECTEUR || role === RoleProjet.EDITEUR, {
    message: "Le rôle doit être soit lecteur, soit éditeur",
  }),
});

export type PartageUserInvitationData = z.infer<typeof PartageUserInvitationSchema>;
