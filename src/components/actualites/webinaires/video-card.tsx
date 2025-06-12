import CmsRichText from "@/src/components/common/CmsRichText";
import { dateToLiteralString } from "@/src/helpers/dateUtils";
import Button from "@codegouvfr/react-dsfr/Button";
import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";
import capitalize from "lodash/capitalize";
import clsx from "clsx";

export const VideoCard = ({ webinaire }: { webinaire: Webinaire }) => {
  return (
    <div key={webinaire.id} className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
      <div className="video-card-presentation basis-6/12 rounded-2xl bg-dsfr-background-action-low-blue-france">
        <div className="mr-4 flex flex-row items-center justify-between">
          <div
            className={clsx(
              "rounded-br-2xl rounded-tl-2xl",
              "bg-dsfr-orange-warning py-2 px-4 font-bold text-white",
            )}
          >
            Replay
          </div>
          <div className="text-pfmv-navy">
            {(webinaire.attributes.jour_evenement &&
              capitalize(dateToLiteralString(new Date(webinaire.attributes.jour_evenement)) ?? undefined)) ||
              "Date non définie"}
          </div>
        </div>
        <div className="m-6 text-xl font-bold text-pfmv-navy">{webinaire.attributes.titre}</div>
        <div className="w-full pr-4 text-right">
          <Button
            className=" mb-6 !w-36 !justify-center rounded-3xl"
            linkProps={{ href: webinaire.attributes.lien_replay!, target: "_blank" }}
          >
            {"Replay"}
          </Button>
        </div>
      </div>
      <CmsRichText label={webinaire.attributes.description || ""} className="!mt-4 basis-8/12" />
    </div>
  );
};
