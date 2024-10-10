import { Prisma } from "@prisma/client";
import { prismaClient } from "./prismaClient";
import { UserWithAdminProjets } from "./prismaCustomTypes";

export const getLastHubspotSync = async () =>
  await prismaClient.cron_jobs.findFirst({
    where: { job_type: "SYNC_HUBSPOT" },
    orderBy: { execution_end_time: "desc" },
  });

export const getUsersAndProjectsFromLastSync = async (): Promise<UserWithAdminProjets[]> => {
  const lastSync = await getLastHubspotSync();

  const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);
  const lastSyncTimeParam = [{ created_at: { gte: lastSyncDate } }, { updated_at: { gte: lastSyncDate } }];

  const usersAndProjects = await prismaClient.user.findMany({
    where: {
      OR: [
        { created_at: { gte: lastSyncDate } },
        { updated_at: { gte: lastSyncDate } },
        {
          projets: {
            some: {
              AND: [
                { role: "ADMIN" },
                {
                  projet: {
                    OR: lastSyncTimeParam,
                  },
                },
              ],
            },
          },
        },
      ],
    },
    include: {
      projets: {
        where: {
          AND: [
            { role: "ADMIN" },
            {
              projet: {
                OR: lastSyncTimeParam,
              },
            },
          ],
        },
        include: {
          projet: true,
        },
      },
    },
  });

  return usersAndProjects;
};
