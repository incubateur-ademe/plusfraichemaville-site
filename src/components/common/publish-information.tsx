import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import clsx from "clsx";

export const PublishInformation = ({
  publishedAt,
  updatedAt,
  className,
}: {
  publishedAt?: Date;
  updatedAt?: Date;
  className?: string;
}) => {
  if (!publishedAt) {
    return null;
  }
  const datePublished = dateToStringWithoutTime(new Date(publishedAt));
  const dateUpdated = updatedAt ? dateToStringWithoutTime(new Date(updatedAt)) : null;
  const updateSentence = datePublished !== dateUpdated ? `, mis à jour le ${dateUpdated}` : "";
  return (
    <div className={clsx("mt-2 italic", className)}>{`Publié le ${datePublished}${
      updateSentence ? updateSentence : ""
    }`}</div>
  );
};
