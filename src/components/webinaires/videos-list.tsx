import { VideoCard } from "@/src/components/webinaires/video-card";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { getAllWebinaires } from "@/src/lib/strapi/queries/webinaires-queries";
import orderBy from "lodash/orderBy";
import { Separator } from "@/src/components/common/separator";

export const VideosList = async ({ className }: { className?: string }) => {
  const allWebinaires = await getAllWebinaires();
  const pastWebinaires = orderBy(
    allWebinaires.filter(
      (webinaire) =>
        webinaire.attributes.jour_evenement &&
        webinaire.attributes.lien_replay &&
        new Date(webinaire.attributes.jour_evenement) <= new Date(),
    ),
    (webinaire) => webinaire.attributes.jour_evenement,
    "desc",
  );

  return (
    <div className={className}>
      <Conditional>
        <Case condition={pastWebinaires.length > 0}>
          <div className="flex flex-col gap-6">
            {pastWebinaires?.map((webinaire) => (
              <div key={webinaire.id} >
                <VideoCard webinaire={webinaire} />
                <Separator className="mt-6"/>
              </div>
            ))}
          </div>
        </Case>
        <Default>
          <div className="rounded-xl bg-white px-8 py-4 md:flex-row md:gap-12">
            {"Il n'y a aucune vidéo de disponible."}
          </div>
        </Default>
        ;
      </Conditional>
    </div>
  );
};
