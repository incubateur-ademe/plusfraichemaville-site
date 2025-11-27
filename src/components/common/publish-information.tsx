import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";

export const PublishInformation = ({ publishedAt, updatedAt }: { publishedAt?: Date; updatedAt?: Date }) => {
  if (!publishedAt) {
    return null;
  }
  const datePublished = dateToStringWithoutTime(new Date(publishedAt));
  const dateUpdated = updatedAt ? dateToStringWithoutTime(new Date(updatedAt)) : null;
  const updateSentence = datePublished !== dateUpdated ? `, mis à jour le ${dateUpdated}` : "";
  return <div className="mt-2 italic">{`Publié le ${datePublished}${updateSentence ? updateSentence : ""}`}</div>;
};
