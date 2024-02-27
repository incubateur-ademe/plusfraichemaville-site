import { error, success } from "@/helpers/messages";
import toast from "react-hot-toast";

const messages = {
  ...error,
  ...success,
};

export type NotificationsType = "success" | "error";
export type NotificationsMessage = keyof typeof messages;

export const notifications = (type: NotificationsType, message: NotificationsMessage) => toast[type](messages[message]);
