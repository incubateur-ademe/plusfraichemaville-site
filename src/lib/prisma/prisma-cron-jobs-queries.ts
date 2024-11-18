import { cron_jobs } from "@prisma/client";
import { prismaClient } from "./prismaClient";
import { UserWithAdminProjets } from "./prismaCustomTypes";

export const getLastHubspotSync = async () =>
  await prismaClient.cron_jobs.findFirst({
    where: { job_type: "SYNC_HUBSPOT" },
    orderBy: { execution_end_time: "desc" },
  });

export const saveCronJob = async (startTime: Date, endTime: Date, jobType: cron_jobs["job_type"]) =>
  await prismaClient.cron_jobs.create({
    data: {
      execution_start_time: startTime,
      execution_end_time: endTime,
      job_type: jobType,
    },
  });

export const getUsersAndProjectsFromLastSync = async (): Promise<UserWithAdminProjets[]> => {
  const lastSync = await getLastHubspotSync();
  const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);
  const lastSyncTimeParams = [
    { created_at: { gte: lastSyncDate } },
    { updated_at: { gte: lastSyncDate } },
    { deleted_at: { gte: lastSyncDate } },
  ];

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
                    OR: lastSyncTimeParams,
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
                OR: lastSyncTimeParams,
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
