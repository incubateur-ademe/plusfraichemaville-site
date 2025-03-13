import Link from "next/link";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";

export default function AideDecisionEtapeCard({
  etapeAttributes,
}: {
  etapeAttributes: AideDecisionEtape["attributes"];
}) {
  return (
    <Link
      className="pfmv-card ml-4 mr-4 flex w-96 flex-row items-center md:ml-0 md:mr-0 md:w-56 md:flex-col"
      href={`${PFMV_ROUTES.AIDE_DECISION}/${etapeAttributes.slug}`}
    >
      <div className="flex h-full w-32 md:h-36 md:w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(etapeAttributes.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={etapeAttributes.nom || ""}
          className={"h-full w-full rounded-l-2xl object-cover md:rounded-t-2xl md:rounded-bl-none"}
          unoptimized
        />
      </div>
      <div className="m-4 max-w-[11rem] md:max-w-none">
        <h3 className={"text-blue-hover mb-0 text-[16px] font-bold leading-tight"}>{etapeAttributes.nom}</h3>
        <div className={"fr-text mt-4 hidden text-dsfr-text-mention-grey md:block"}>{etapeAttributes.description}</div>
      </div>
    </Link>
  );
}
