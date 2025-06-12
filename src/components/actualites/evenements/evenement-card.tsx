import CmsRichText from "@/src/components/common/CmsRichText";
import Link from "next/link";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { Evenement } from "@/src/lib/strapi/types/api/evenement";

export const EvenementCard = ({ evenement }: { evenement: Evenement }) => {
  const evenementAttributes = evenement.attributes;
  const imageAttributes = evenementAttributes.image_principale.data.attributes;
  return (
    <div className="pfmv-flat-card flex w-96 flex-col md:ml-0">
      <div className="flex h-52 w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(evenementAttributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={`${evenementAttributes.type} ${imageAttributes.alternativeText}`}
          className={"h-full w-full rounded-t-2xl object-cover"}
          unoptimized
        />
      </div>
      <div className="px-6 py-6 pt-8">
        <CmsRichText label={evenementAttributes.description} />
        {evenementAttributes.bouton_lien && (
          <Link className="fr-btn fr-btn--tertiary rounded-3xl" href={evenementAttributes.bouton_lien} target="_blank">
            {evenementAttributes.bouton_texte}
          </Link>
        )}
      </div>
    </div>
  );
};
