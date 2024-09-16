import { RagtimeConversationHistory } from "@/src/services/ragtime/ragtime-types";
import { ragtimeConfig, RagtimeSlug } from "./config";
import { Result } from "@/src/helpers/result-manager";

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
