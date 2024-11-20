import { WebinaireResponse } from "@/src/components/webinaires/types";

import { WebinaireCard } from "@/src/components/webinaires/webinaire-card";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import clsx from "clsx";

export const WebinairesList = ({
  id,
  webinaires,
  emptyListPlaceholder,
  tabIndex,
}: {
  id: string;
  webinaires: WebinaireResponse[];
  emptyListPlaceholder: string;
  tabIndex: number;
}) => {
  return (
    <div
      id={id}
      className={clsx("fr-tabs__panel !px-0 md:!py-12", !tabIndex && "fr-tabs__panel--selected")}
      role="tabpanel"
      aria-labelledby={id}
      tabIndex={tabIndex}
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
