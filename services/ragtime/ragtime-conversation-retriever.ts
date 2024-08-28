import { ConversationHistory } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig, RagtimeSlug } from "./config";

export const ragtimeConversationRetriever = async (conversationId: string): Promise<ConversationHistory> => {
  const slug = `${RagtimeSlug.conversation}/${conversationId}`;
  return ragtimeConfig<ConversationHistory>(
    slug,
    {
      conversationId,
    },
    "GET",
  );
};
