import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function AideDecisionEtapeCard({
  etapeAttributes,
}: {
  etapeAttributes: AideDecisionEtape["attributes"];
}) {
  return (
    <article className="pfmv-card fr-enlarge-link mx-4 flex w-96 flex-row items-center md:mx-0 md:w-56 md:flex-col">
      <div className="flex h-full w-32 md:h-36 md:w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(etapeAttributes.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt=""
          className={"h-full w-full rounded-l-2xl object-cover md:rounded-t-2xl md:rounded-bl-none"}
          unoptimized
        />
      </div>
      <div className="m-4 max-w-[11rem] md:max-w-none">
        <h2 className={"text-blue-hover mb-0 text-[16px] font-bold leading-tight"}>
          <LinkWithoutPrefetch className="bg-none" href={`${PFMV_ROUTES.AIDE_DECISION}/${etapeAttributes.slug}`}>
            {etapeAttributes.nom}
          </LinkWithoutPrefetch>
        </h2>
        <div className={"fr-text mt-4 hidden text-dsfr-text-mention-grey md:block"}>{etapeAttributes.description}</div>
      </div>
    </article>
  );
}
