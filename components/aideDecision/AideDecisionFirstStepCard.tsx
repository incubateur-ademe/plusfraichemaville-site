import Link from "next/link";
import Image from "next/image";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function AideDecisionFirstStepEtapeCard({
  aideDecisionEtape,
}: {
  aideDecisionEtape: GetValues<"api::aide-decision-etape.aide-decision-etape">;
}) {
  return (
    <Link
      className="!bg-none w-32 h-32 flex flex-col items-center pfmv-card"
      href={`${PFMV_ROUTES.AIDE_DECISION}/${aideDecisionEtape.slug}`}
    >
      <div className={"text-sm text-center text-pfmv-light-grey"}>&nbsp;</div>
      <div>
        <Image
          width={80}
          height={80}
          src={getStrapiImageUrl(aideDecisionEtape.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={aideDecisionEtape.nom || ""}
          className={"svg-blue-hover"}
        />
      </div>
      <div className={"text-sm text-center"}>{aideDecisionEtape.nom}</div>
    </Link>
  );
}
