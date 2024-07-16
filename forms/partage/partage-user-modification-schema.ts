import z from "zod";

export const PartageUserModificationSchema = z.object({
  role: z.string(),
});
export type PartageUserModificationData = z.infer<typeof PartageUserModificationSchema>;
