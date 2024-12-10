import { email, emailStatus, emailType, User } from "@prisma/client";
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
  destinationAddress: string | string[],
  type: emailType,
  userProjetId?: number,
  extra?: any,
): Promise<email[]> => {
  const addresses = Array.isArray(destinationAddress) ? destinationAddress : [destinationAddress];

  const emailPromises = addresses.map((address) =>
    prismaClient.email.create({
      data: {
        destination_address: address,
        user_projet_id: userProjetId,
        type: type,
        email_status: emailStatus.PENDING,
        extra: extra,
      },
    }),
  );

  return Promise.all(emailPromises);
};

export const getLastEmailForUserProjet = async (userProjetId: number, emailType: emailType): Promise<email | null> => {
  return prismaClient.email.findFirst({
    where: { user_projet_id: userProjetId, type: emailType },
    orderBy: { sending_time: "desc" },
  });
};

export const getUserWithNoActivityAfterSignup = async (since = 10): Promise<User[] | null> => {
  const SINCE_DAYS_AGO = new Date(Date.now() - since * 24 * 60 * 60 * 1000);

  const noActivityEmails = await prismaClient.email.findMany({
    where: {
      type: emailType.noActivityAfterSignup,
    },
    select: {
      destination_address: true,
    },
  });

  const emailAddresses = noActivityEmails.map((email) => email.destination_address);

  return prismaClient.user.findMany({
    where: {
      created_at: {
        lt: SINCE_DAYS_AGO,
      },
      projets: {
        none: {},
      },
      email: {
        notIn: emailAddresses,
      },
    },
  });
};
