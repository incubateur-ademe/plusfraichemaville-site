import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { useUserStore } from "@/src/stores/user/provider";

export default function AideDecisionEtapeCard({ etapeAttributes }: { etapeAttributes: AideDecisionEtape }) {
  const setAideDecisionStep = useUserStore((state) => state.setChoixSolutionAideDecisionCurrentStep);
  return (
    <article className="pfmv-card fr-enlarge-button flex w-full flex-col">
      <div className="flex h-24 w-full sm:h-36">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(etapeAttributes.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt=""
          className={"h-full w-full rounded-t-2xl rounded-bl-none object-cover"}
          unoptimized
        />
      </div>
      <div className="m-4">
        <h3 className={"text-blue-hover mb-0 text-base font-bold leading-tight"}>
          <button className="bg-none" onClick={() => setAideDecisionStep(etapeAttributes.slug)}>
            {etapeAttributes.nom}
          </button>
        </h3>
        <div className={"fr-text mt-4 text-dsfr-text-mention-grey"}>{etapeAttributes.description}</div>
      </div>
    </article>
  );
}
