import { AideDecisionEtape } from "@/lib/directus/directusModels";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import Image from "next/image";

export default function AideDecisionFirstStepEtapeCard({
  aideDecisionEtape,
}: {
  aideDecisionEtape: AideDecisionEtape;
}) {
  return (
    <Link
      className="bg-none w-32 h-32 flex flex-col items-center aide-decision-first-step-card"
      href={`/aide-decision/${aideDecisionEtape.slug}`}
    >
      <div className={"text-sm text-center text-pfmv-light-grey"}>&nbsp;</div>
      <div>
        <Image
          width={80}
          height={80}
          src={getDirectusImageUrl(aideDecisionEtape.image, DIRECTUS_IMAGE_KEY_SIZE.aideDecisionCard)}
          alt={aideDecisionEtape.nom || ""}
          className={"svg-blue-hover"}
        />
      </div>
      <div className={"text-sm text-center"}>{aideDecisionEtape.nom}</div>
    </Link>
  );
}
