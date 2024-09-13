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
      className="pfmv-card flex h-32 w-32 flex-col items-center !bg-none"
      href={`${PFMV_ROUTES.AIDE_DECISION}/${aideDecisionEtape.slug}`}
    >
      <div className={"text-center text-sm text-pfmv-light-grey"}>&nbsp;</div>
      <div>
        <Image
          width={80}
          height={80}
          src={getStrapiImageUrl(aideDecisionEtape.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={aideDecisionEtape.nom || ""}
          className={"svg-blue-hover"}
        />
      </div>
      <div className={"text-center text-sm"}>{aideDecisionEtape.nom}</div>
    </Link>
  );
}
