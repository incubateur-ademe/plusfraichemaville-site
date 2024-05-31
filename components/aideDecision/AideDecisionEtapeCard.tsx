import Link from "next/link";
import Image from "next/image";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function AideDecisionEtapeCard({
  aideDecisionEtape,
}: {
  aideDecisionEtape: GetValues<"api::aide-decision-etape.aide-decision-etape">;
}) {
  return (
    <Link
      className="pfmv-card ml-4 mr-4 flex w-96 flex-row items-center md:ml-0 md:mr-0 md:w-56 md:flex-col"
      href={`${PFMV_ROUTES.AIDE_DECISION}/${aideDecisionEtape.slug}`}
    >
      <div className="flex h-full w-32 md:h-36 md:w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(aideDecisionEtape.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={aideDecisionEtape.nom || ""}
          className={"h-full w-full rounded-l-2xl object-cover md:rounded-t-2xl md:rounded-bl-none"}
        />
      </div>
      <div className="m-4 max-w-[11rem]">
        <div className={"text-blue-hover font-bold"}>{aideDecisionEtape.nom}</div>
        <div className={"fr-text mt-4 hidden text-dsfr-text-mention-grey md:block"}>
          {aideDecisionEtape.description}
        </div>
      </div>
    </Link>
  );
}
