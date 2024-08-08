import { email, emailStatus } from "@prisma/client";
import { prismaClient } from "./prismaClient";

export const updateEmailStatus = async (id: string, status: emailStatus, brevoId?: string): Promise<email> => {
  return prismaClient.email.update({
    where: { id: id },
    data: {
      email_status: status,
      brevo_id: brevoId,
    },
  });
};
