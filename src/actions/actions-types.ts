import { NotificationsMessage, NotificationsType } from "@/src/components/common/notifications";

export type ResponseAction<T = object> = {
  type?: NotificationsType;
  message?: NotificationsMessage;
} & T;
