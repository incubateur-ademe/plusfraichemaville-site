import { AideDecisionEtape } from "@/lib/directus/directusModels";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import Image from "next/image";

export default function AideDecisionEtapeCard({ aideDecisionEtape }: { aideDecisionEtape: AideDecisionEtape }) {
  return (
    <Link
      className="bg-none w-56 flex flex-col items-center aide-decision-first-step-card"
      href={`/aide-decision/${aideDecisionEtape.slug}`}
    >
      <div className="flex h-36">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(aideDecisionEtape.image, DIRECTUS_IMAGE_KEY_SIZE.aideDecisionCard)}
          alt={aideDecisionEtape.nom || ""}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="m-4">
        <div className={"font-bold "}>{aideDecisionEtape.nom}</div>
        <div className={"fr-text text-dsfr-text-mention-grey mt-4"}>{aideDecisionEtape.description}</div>
      </div>
    </Link>
  );
}
