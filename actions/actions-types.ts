import { NotificationsMessage, NotificationsType } from "@/components/common/notifications";

export type ResponseAction<T = {}> = {
  type: NotificationsType;
  message: NotificationsMessage;
} & T;

export type PromisedResponseAction<T = {}> = Promise<ResponseAction<T>>;
