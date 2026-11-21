import clsx from "clsx";
import AnnuaireCardAccordion from "@/src/components/common/annuaire-card-accordion";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { CharteSignataire } from "@/src/components/charte/charte-helpers";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import CardWithAccordion from "@/src/components/common/card-with-accordion";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Tag from "@codegouvfr/react-dsfr/Tag";

type CharteSignataireCardProps = {
  signataire: CharteSignataire;
  className?: string;
};

export const CharteSignataireCard = ({ signataire, className }: CharteSignataireCardProps) => {
  const retoursExperience = signataire.retour_experiences.filter((rex) => rex !== null);
  const departementLabel = [signataire.departement.nom, `(${signataire.departement.code})`].filter(Boolean).join(" ");
  const accordionTitle =
    retoursExperience.length === 1 ? "Voir son retour d'expérience" : `Voir ses retours d'expérience (${retoursExperience.length})`;

  return (
    <div
      className={clsx(
        "flex flex-col justify-between overflow-y-hidden border-[1px] border-dsfr-border-default-grey",
        className,
      )}
    >
      <div className="p-4">
        <Tag className="bg-dsfr-background-alt-blue-france text-pfmv-navy font-bold"  iconId="fr-icon-check-line">{signataire.annee_signature}</Tag>
        <div className="fr-h5 !mb-1">{signataire.nom_collectivite}</div>
        <div>{departementLabel}</div>
        <div>{signataire.regionLabel}</div>
      </div>
      {retoursExperience.length > 0 && (
        <CardWithAccordion ariaId={`accordion-charte-rex-${signataire.documentId}`} title={accordionTitle}>
          <ul className="!mb-0 flex flex-col gap-2 !pb-4">
            {retoursExperience.map((rex) => (
              <li key={rex.slug}>
                <LinkWithoutPrefetch className="fr-link" href={PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(rex.slug)}>
                  {rex.titre}
                </LinkWithoutPrefetch>
              </li>
            ))}
          </ul>
        </CardWithAccordion>
      )}
    </div>
  );
};
