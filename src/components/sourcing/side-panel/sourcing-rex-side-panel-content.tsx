import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { RetourExperienceResponse } from "../../ficheSolution/type";
import { getRegionLabelFromCode } from "@/src/helpers/regions";

export const SourcingRexSidePanelContent = ({ data }: { data: RetourExperienceResponse[] }) => {
  const projet = data[0].attributes;

  return (
    <div className="p-5">
      <div className="mb-5">
        <h2 className="mb-4 text-xl font-bold text-pfmv-navy">Le projet</h2>
        <div className="pfmv-card-no-hover w-[362px] overflow-hidden">
          <div className="h-36 overflow-hidden">
            <Image
              width={362}
              height={144}
              src={getStrapiImageUrl(projet.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt=""
              className="object-cover"
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
    </div>
  );
};
