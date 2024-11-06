import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { RetourExperienceResponse } from "../../ficheSolution/type";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { SourcingContactCard } from "../contacts/sourcing-contact-card";
import { RetourExperienceContactType } from "@/src/lib/strapi/types/types";
import { Case, Conditional, Default } from "../../common/conditional-renderer";
import clsx from "clsx";

export const SourcingRexSidePanelContent = ({ data }: { data: RetourExperienceResponse }) => {
  const projet = data.attributes;
  const contacts = data.attributes.contacts as RetourExperienceContactType[];
  return (
    <>
      <div className="mb-5">
        <h2 className="mb-4 text-xl font-bold text-pfmv-navy">Le projet</h2>
        <div className="overflow-hidden rounded-2xl border-[1px] border-dsfr-border-default-grey">
          <div className="h-36 overflow-hidden">
            <Image
              width={362}
              height={144}
              src={getStrapiImageUrl(projet.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt=""
              className="h-full object-cover"
            />
          </div>
          <div className="px-6 py-4">
            <Badge small noIcon severity="success" className="mb-2">
              Projet réalisé
            </Badge>
            <h3 className="mb-4 text-lg font-bold">{projet.titre}</h3>
            <div className="w-fit rounded-xl bg-dsfr-contrast-grey px-2 py-[2px] text-xs">
              {getRegionLabelFromCode(projet.region?.data.attributes.code)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-bold text-pfmv-navy">Contacts</h2>
        <Conditional>
          <Case condition={contacts.length > 0}>
            {contacts?.map((contact, index) => <SourcingContactCard contact={contact} key={index} />)}
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
