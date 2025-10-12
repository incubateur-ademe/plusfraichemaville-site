import { email, emailStatus, emailType, User } from "@/src/generated/prisma/client";
import { prismaClient } from "./prismaClient";
import { removeDaysToDate } from "@/src/helpers/dateUtils";

export const updateEmailStatus = async (id: string, status: emailStatus, brevoId?: string): Promise<email> => {
  return prismaClient.email.update({
    where: { id: id },
    data: {
      email_status: status,
      brevo_id: brevoId,
    },
  });
};

export const createEmail = async ({
  to,
  emailType,
  userProjetId,
  userId,
  extra,
}: {
  to: string;
  emailType: emailType;
  userProjetId?: number;
  userId?: string;
  extra?: any;
}): Promise<email> => {
  return prismaClient.email.create({
    data: {
      destination_address: to,
      user_projet_id: userProjetId,
      type: emailType,
      email_status: emailStatus.PENDING,
      extra: extra,
      user_id: userId,
    },
  });
};

export const getLastEmailForUserProjet = async (userProjetId: number, emailType: emailType): Promise<email | null> => {
  return prismaClient.email.findFirst({
    where: { user_projet_id: userProjetId, type: emailType },
    orderBy: { sending_time: "desc" },
  });
};

export const getUserWithNoActivityAfterSignup = async (lastSyncDate: Date, inactivityDays = 10): Promise<User[]> => {
  return prismaClient.user.findMany({
    where: {
      created_at: {
        gte: removeDaysToDate(lastSyncDate, inactivityDays),
        lte: removeDaysToDate(new Date(), inactivityDays),
      },
      accept_communication_suivi_projet: true,
      projets: {
        none: {},
      },
      emails: {
        none: {
          type: emailType.noActivityAfterSignup,
          email_status: emailStatus.SUCCESS,
        },
      },
    },
  });
};
