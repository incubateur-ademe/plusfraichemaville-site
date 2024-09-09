import { NotificationsMessage } from "@/components/common/notifications";

type Success<Response> = {
  success: true;
  value: Response;
};

type Failure = {
  success: false;
  error: NotificationsMessage;
};

export type Result<Response> = Success<Response> | Failure;

export const success = <Response>(value: Response): Success<Response> => ({ success: true, value });
export const failure = (error: NotificationsMessage): Failure => ({ success: false, error });
