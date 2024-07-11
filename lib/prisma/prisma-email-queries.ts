import { email, emailStatus, emailType } from "@prisma/client";
import { prismaClient } from "./prismaClient";

export const createEmailRecord = async (to: string, type: emailType): Promise<email> => {
  const email = await prismaClient.email.create({
    data: {
      destination_address: to,
      type: type,
      email_status: emailStatus.PENDING,
    },
  });
  return email;
};

export const updateEmailStatus = async (id: string, status: emailStatus, brevoId?: string): Promise<email> => {
  const email = await prismaClient.email.update({
    where: { id: id },
    data: {
      email_status: status,
      brevo_id: brevoId,
    },
  });
  return email;
};
