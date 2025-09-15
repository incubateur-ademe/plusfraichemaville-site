import { error, success } from "@/src/helpers/messages";
import toast from "react-hot-toast";

export const messages = {
  ...error,
  ...success,
};

export type NotificationsType = "success" | "error";
export type NotificationsMessage = keyof typeof messages;

export const notifications = (type?: NotificationsType, message?: NotificationsMessage) => {
  if (!type || !message) {
    console.warn("Notifications: le type et le message ne sont pas définis dans la réponse de la serveur action.");
  } else {
    toast[type](messages[message]);
  }
};
