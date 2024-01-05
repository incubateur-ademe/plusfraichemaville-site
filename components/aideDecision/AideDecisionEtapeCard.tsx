import Link from "next/link";
import Image from "next/image";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

export default function AideDecisionEtapeCard({
  aideDecisionEtape,
}: {
  aideDecisionEtape: GetValues<"api::aide-decision-etape.aide-decision-etape">;
}) {
  return (
    <Link
      className="flex w-96 md:w-56 flex-row md:flex-col items-center pfmv-card mr-4 ml-4 md:mr-0 md:ml-0"
      href={`/aide-decision/${aideDecisionEtape.slug}`}
    >
      <div className="flex w-32 md:w-full h-full md:h-36">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(aideDecisionEtape.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={aideDecisionEtape.nom || ""}
          className={"w-full h-full object-cover rounded-l-2xl md:rounded-bl-none md:rounded-t-2xl"}
        />
      </div>
      <div className="m-4 max-w-[11rem]">
        <div className={"font-bold text-blue-hover"}>{aideDecisionEtape.nom}</div>
        <div className={"hidden md:block fr-text text-dsfr-text-mention-grey mt-4"}>
          {aideDecisionEtape.description}
        </div>
      </div>
    </Link>
  );
}
