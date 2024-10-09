import { prismaClient } from "./prismaClient";

export const getLastHubspotSync = async () =>
  await prismaClient.cron_jobs.findFirst({
    where: { job_type: "SYNC_HUBSPOT" },
    orderBy: { execution_end_time: "desc" },
  });

// export async function getUsersAndProjectsFromLastSync() {
//   const lastSync = await getLastHubspotSync();

//   const lastSyncDate = lastSync?.execution_end_time ?? new Date(0);
//   const lastSyncTimeParam = [{ created_at: { gte: lastSyncDate } }, { updated_at: { gte: lastSyncDate } }];

//   const usersAndProjects = await prismaClient.user.findMany({
//     where: {
//       OR: [
//         { created_at: { gte: lastSyncDate } },
//         { updated_at: { gte: lastSyncDate } },
//         {
//           projets_created: {
//             some: {
//               OR: lastSyncTimeParam,
//             },
//           },
//         },
//         {
//           projets: {
//             some: {
//               projet: {
//                 OR: lastSyncTimeParam,
//               },
//             },
//           },
//         },
//       ],
//     },
//     include: {
//       projets_created: {
//         where: {
//           OR: lastSyncTimeParam,
//         },
//       },
//       projets: {
//         where: {
//           projet: {
//             OR: lastSyncTimeParam,
//           },
//         },
//         include: {
//           projet: true,
//         },
//       },
//     },
//   });

//   return usersAndProjects;
// }
