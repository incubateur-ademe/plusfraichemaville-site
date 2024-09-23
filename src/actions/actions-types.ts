import { NotificationsMessage, NotificationsType } from "@/src/components/common/notifications";

export type ResponseAction<T = {}> = {
  type?: NotificationsType;
  message?: NotificationsMessage;
} & T;
