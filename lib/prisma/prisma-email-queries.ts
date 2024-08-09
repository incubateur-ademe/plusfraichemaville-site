import { email, emailStatus, emailType } from "@prisma/client";
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

export const createEmail = async (
  destinationAddress: string,
  type: emailType,
  userProjetId: number,
): Promise<email> => {
  return prismaClient.email.create({
    data: {
      destination_address: destinationAddress,
      user_projet_id: userProjetId,
      type: type,
      email_status: emailStatus.PENDING,
    },
  });
};

export const getLastEmailForUserProjet = async (userProjetId: number, emailType: emailType): Promise<email | null> => {
  return prismaClient.email.findFirst({
    where: { user_projet_id: userProjetId, type: emailType },
    orderBy: { sending_time: "desc" },
  });
};
