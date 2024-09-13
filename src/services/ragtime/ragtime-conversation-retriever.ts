import { RagtimeConversationHistory } from "@/services/ragtime/ragtime-types";
import { ragtimeConfig, RagtimeSlug } from "./config";
import { Result } from "@/helpers/result-manager";

export const ragtimeConversationRetriever = async (
  conversationId: string,
): Promise<Result<RagtimeConversationHistory>> => {
  const slug = `${RagtimeSlug.conversation}/${conversationId}`;
  return ragtimeConfig<RagtimeConversationHistory>(
    slug,
    {
      conversationId,
    },
    "GET",
  );
};
