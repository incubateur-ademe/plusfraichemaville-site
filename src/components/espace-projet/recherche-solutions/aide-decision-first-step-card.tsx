import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { useUserStore } from "@/src/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import {
  ESPACE_PROJET_AIDE_DECISION_AUTRE_ESPACE,
  ESPACE_PROJET_AIDE_DECISION_BON_ESPACE,
} from "@/src/helpers/matomo/matomo-tags";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export default function AideDecisionFirstStepEtapeCard({ etapeAttributes }: { etapeAttributes: AideDecisionEtape }) {
  const setAideDecisionStep = useUserStore((state) => state.setChoixSolutionAideDecisionCurrentStep);
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const handleClick = () => {
    if (etapeAttributes.nom === selectEspaceLabelByCode(currentProjet?.type_espace)) {
      trackEvent(ESPACE_PROJET_AIDE_DECISION_BON_ESPACE);
    } else {
      trackEvent(ESPACE_PROJET_AIDE_DECISION_AUTRE_ESPACE);
    }
    setAideDecisionStep(etapeAttributes.slug);
  };

  return (
    <Button className="pfmv-card flex h-[7.75rem] w-32 flex-col items-center !bg-none pt-4" onClick={handleClick}>
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
      <div className={"text-center text-sm text-dsfr-text-default-grey"}>{etapeAttributes.nom}</div>
    </Button>
  );
}
