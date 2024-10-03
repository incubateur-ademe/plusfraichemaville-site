import { prismaClient } from "./prismaClient";

export const createSyncLogRecord = async () =>
  prismaClient.syncLog.create({
    data: {
      lastSyncDate: new Date(),
    },
  });
