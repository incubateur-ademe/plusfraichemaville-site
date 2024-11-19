import Badge from "@codegouvfr/react-dsfr/Badge";
import { RetourExperienceResponse } from "../../ficheSolution/type";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { SourcingContactCard } from "../contacts/sourcing-contact-card";
import { Case, Conditional, Default } from "../../common/conditional-renderer";
import clsx from "clsx";
import { StrapiSourcingContact } from "@/src/components/sourcing/types";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { strapiContactToSourcingContact } from "@/src/components/sourcing/helpers";
import Tag from "@codegouvfr/react-dsfr/Tag";

export const SourcingRexContent = ({ data }: { data: RetourExperienceResponse }) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const retourExperienceAttributes = data.attributes;
  const contacts = (data.attributes.contacts as unknown as StrapiSourcingContact[]).map((contact) =>
    strapiContactToSourcingContact(contact, data),
  );
  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey" +
            "min-h-[11.5rem] px-5 pb-4 pt-6",
        )}
      >
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!bg-dsfr-text-default-success !text-dsfr-text-inverted-success">
            Projet réalisé
          </Badge>
          <div className="flex flex-row items-center gap-1">
            <div className="text-sm">Budget</div>
            <div className="text-sm font-bold">{retourExperienceAttributes.cout}</div>
          </div>
        </div>
        <div className="mb-8 mt-4 text-lg font-bold">{retourExperienceAttributes.titre}</div>
        <Tag small className="h-fit">
          {getRegionLabelFromCode(retourExperienceAttributes.region?.data.attributes.code)}
        </Tag>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-pfmv-navy">{contacts.length > 0 ? "Contacts" : "Contact"}</h2>
        <Conditional>
          <Case condition={contacts.length > 0}>
            {contacts?.map((contact, index) => (
              <SourcingContactCard
                contact={contact}
                key={index}
                sourcingProjetId={currentProjetId}
                className="mb-4"
                showSourcedProjet={false}
              />
            ))}
          </Case>
          <Default>
            <div
              className={clsx(
                "flex h-64 items-center justify-center overflow-hidden",
                "rounded-2xl border-[1px] border-dsfr-border-default-grey",
              )}
            >
              <div className="p-6">{"Aucun contact n'est associé à ce projet"}</div>
            </div>
          </Default>
        </Conditional>
      </div>
    </>
  );
};
