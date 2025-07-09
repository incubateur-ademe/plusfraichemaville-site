import { PFMV_ROUTES } from "@/src/helpers/routes";
// eslint-disable-next-line max-len
import { AvailableProjetsForCollectiviteButton } from "@/src/components/liste-projets/available-projets-for-collectivite-button";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const ListeProjetsHeader = ({ isListEmpty }: { isListEmpty: boolean }) => {
  return (
    <>
      <div className="flex justify-between pb-4">
        <div className="">
          <h1 className="mb-1 text-2xl text-dsfr-text-label-blue-france">Mon espace projet</h1>
          <span className="mb-8 block text-lg">Les projets de rafraîchissement de ma collectivité</span>
        </div>
        {!isListEmpty && (
          <div className="align-items-center flex flex-wrap-reverse items-center gap-4">
            <AvailableProjetsForCollectiviteButton className={"rounded-3xl"} />
            <LinkWithoutPrefetch
              href={PFMV_ROUTES.CREATE_PROJET}
              className="fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl"
            >
              Créer un projet
            </LinkWithoutPrefetch>
          </div>
        )}
      </div>
    </>
  );
};
