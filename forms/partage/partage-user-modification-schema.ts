import { RoleProjet } from "@prisma/client";
import z from "zod";

export const PartageUserModificationSchema = z.object({
  role: z.nativeEnum(RoleProjet),
});
export type PartageUserModificationData = z.infer<typeof PartageUserModificationSchema>;