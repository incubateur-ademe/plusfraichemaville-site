import { WebinaireResponse } from "@/src/components/webinaires/types";
import React from "react";
import { WebinaireCard } from "@/src/components/webinaires/webinaire-card";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";

export const WebinairesList = ({
  id,
  webinaires,
  emptyListPlaceholder,
}: {
  id: string;
  webinaires: WebinaireResponse[];
  emptyListPlaceholder: string;
}) => {
  return (
    <div
      id={id}
      className="fr-tabs__panel fr-tabs__panel--selected !px-0 md:!py-12"
      role="tabpanel"
      aria-labelledby={id}
      tabIndex={0}
    >
      <div className="bg-dsfr-background-open-blue-france p-8">
        <Conditional>
          <Case condition={webinaires.length > 0}>
            <div className="flex flex-col gap-6">
              {webinaires?.map((webinaire) => <WebinaireCard key={webinaire.id} webinaire={webinaire} />)}
            </div>
          </Case>
          <Default>
            <div className="rounded-xl bg-white px-8 py-4 md:flex-row md:gap-12">{emptyListPlaceholder}</div>
          </Default>
          ;
        </Conditional>
      </div>
    </div>
  );
};
