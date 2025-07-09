import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function AideDecisionFirstStepEtapeCard({
  etapeAttributes,
}: {
  etapeAttributes: AideDecisionEtape["attributes"];
}) {
  return (
    <LinkWithoutPrefetch
      className="pfmv-card flex h-32 w-32 flex-col items-center !bg-none"
      href={`${PFMV_ROUTES.AIDE_DECISION}/${etapeAttributes.slug}`}
    >
      <div className={"text-center text-sm text-pfmv-light-grey"}>&nbsp;</div>
      <div>
        <Image
          width={80}
          height={80}
          src={getStrapiImageUrl(etapeAttributes.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={etapeAttributes.nom || ""}
          className={"svg-blue-hover"}
          unoptimized
        />
      </div>
      <div className={"text-center text-sm"}>{etapeAttributes.nom}</div>
    </LinkWithoutPrefetch>
  );
}
