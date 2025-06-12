import { VideoCard } from "@/src/components/actualites/webinaires/video-card";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { getAllWebinaires } from "@/src/lib/strapi/queries/webinaires-queries";
import { Separator } from "@/src/components/common/separator";
import { getAllEvenements } from "@/src/lib/strapi/queries/evenements-queries";
import { isWebinaireInFuture } from "@/src/components/actualites/webinaires/webinaires-helpers";
import isEmpty from "lodash/isEmpty";
import { EvenementCard } from "@/src/components/actualites/evenements/evenement-card";

export const EvenementsList = async ({ className }: { className?: string }) => {
  const allWebinaires = await getAllWebinaires();
  const allEvenements = await getAllEvenements();
  const futureWebinaires = allWebinaires.filter(isWebinaireInFuture);

  return (
    <div className={className}>
      <Conditional>
        <Case condition={!isEmpty(allEvenements)}>
          <div className="flex flex-col gap-6">
            {allEvenements?.map((evenement) => (
              <div key={evenement.id}>
                <EvenementCard evenement={evenement} />
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
