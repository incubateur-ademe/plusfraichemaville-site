import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { useUserStore } from "@/src/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";

export default function AideDecisionFirstStepEtapeCard({
  etapeAttributes,
}: {
  etapeAttributes: AideDecisionEtape["attributes"];
}) {
  const setAideDecisionStep = useUserStore((state) => state.setAideDecisionStep);
  return (
    <Button
      className="pfmv-card flex h-[7.75rem] w-32 flex-col items-center !bg-none pt-4"
      onClick={() => setAideDecisionStep(etapeAttributes.slug)}
    >
      <div>
        <Image
          width={80}
          height={80}
          src={getStrapiImageUrl(etapeAttributes.image, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt=""
          className={"svg-blue-hover"}
          unoptimized
        />
      </div>
      <div className={"text-center text-dsfr-text-default-grey text-sm"}>{etapeAttributes.nom}</div>
    </Button>
  );
}
