import { RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig, RagtimeSlug } from "./config";

export const ragtimeConversationRetriever = async (conversationId: string): Promise<RagtimeConversationHistory> => {
  const slug = `${RagtimeSlug.conversation}/${conversationId}`;
  return ragtimeConfig<RagtimeConversationHistory>(
    slug,
    {
      conversationId,
    },
    "GET",
  );
};
