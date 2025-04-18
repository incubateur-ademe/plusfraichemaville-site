import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import Image from "next/image";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Button from "@codegouvfr/react-dsfr/Button";

export const metadata: Metadata = computeMetadata("Exemples de diagnostic réalisé par les collectivités");

export default async function AccomagnementEspaceProjetCard() {
  return (
    <div
      className={clsx(
        "flex flex-col gap-2 rounded-xl bg-dsfr-background-action-low-blue-france p-6",
        "justify-between md:flex-row",
      )}
    >
      <div className={"flex flex-col gap-10 md:flex-row"}>
        <Image src="/images/logo-pfmv.svg" alt="Logo Plus fraîche ma ville" width={174} height={73} className="w-44" />
        <div className="max-w-[32rem] text-lg font-bold text-pfmv-navy">
          Plus fraîche ma ville vous accompagne à chaque étape de votre projet de rafraîchissement, depuis le diagnostic
          jusqu’à la mise en œuvre des solutions.
        </div>
      </div>
      <Button linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }} className="my-auto text-nowrap rounded-3xl">
        {"Démarrer sur l'espace projet !"}
      </Button>
    </div>
  );
}
