export interface Conversation {
  conversationId: string;
  events: Event[];
}

export interface ConversationHistoryMessage {
  timestamp: string;
  role: "user" | "assistant";
  content: string;
  msgIndex: number;
}

export interface Event {
  type: "start" | "message";
  data: string;
}

export interface ConversationHistory {
  id: string;
  createdOn: string;
  updatedOn: string;
  messages: ConversationHistoryMessage[];
  supervisionReportCount: number;
}

export interface ConversationContext {
  ficheSolutionId: number;
  ficheDiagnosticId: number;
  estimationId: number;
  projetId: number;
  collectiviteId: number;
}
