export interface AiConversation {
  conversationId: string;
  events: AiEvent[];
}

export type AiRole = "user" | "system" | "assistant";

export interface ConversationHistoryMessage {
  timestamp: string;
  role: AiRole;
  content: string;
  msgIndex: number;
}

export interface AiEvent {
  type: "start" | "message";
  data: string;
}

export type ConversationHistory = {
  role: AiRole;
  message: string | string[];
}[];

export interface RagtimeConversationHistory {
  id: string;
  createdOn: string;
  updatedOn: string;
  messages: ConversationHistoryMessage[];
  supervisionReportCount: number;
}
