export interface Conversation {
  conversationId: string;
  events: Event[];
}

export interface Event {
  type: "start" | "message";
  data: string;
}
