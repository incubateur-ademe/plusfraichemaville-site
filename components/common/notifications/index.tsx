import { error, success } from "@/helpers/messages";
import toast from "react-hot-toast";

const messages = {
  ...error,
  ...success,
};

export type NotificationsType = "success" | "error";
export type NotificationsMessage = keyof typeof messages;

export const notifications = (type?: NotificationsType, message?: NotificationsMessage) => {
  !type || !message
    ? console.warn("Notifications: le type et le message ne sont pas définis dans la réponse de la serveur action.")
    : toast[type](messages[message]);
};
