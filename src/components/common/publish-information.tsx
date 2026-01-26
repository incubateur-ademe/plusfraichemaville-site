import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import clsx from "clsx";

export const PublishInformation = ({ updatedAt, className }: { updatedAt?: Date; className?: string }) => {
  if (!updatedAt) {
    return null;
  }
  const dateUpdated = dateToStringWithoutTime(new Date(updatedAt));
  return <div className={clsx("mt-2 italic", className)}>{`Dernière mise à jour le ${dateUpdated}`}</div>;
};
