import { prismaClient } from "./prismaClient";

export const saveConversation = async (ragtimeId: string, userId?: string) => {
  return prismaClient.conversation.create({
    data: {
      ragtimeId,
      userId: userId ?? null,
    },
  });
};

export const retrieveLoggedConversation = async (conversationId: string, userId: string) => {
  return prismaClient.conversation.findUnique({
    where: {
      id: conversationId,
      OR: [
        {
          userId,
        },
        {
          userId: null,
        },
      ],
    },
  });
};

export const retrieveAnonymousConversation = async (conversationId: string) => {
  return prismaClient.conversation.findUnique({
    where: {
      id: conversationId,
      userId: null,
    },
  });
};
