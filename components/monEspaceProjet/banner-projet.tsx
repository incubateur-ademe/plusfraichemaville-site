"use client";
import { useProjetsStore } from "@/stores/projets/provider";
import { PictoEspaceSelector } from "@/components/common/pictos";
import { PictoId } from "@/components/common/pictos/picto-espace-selector";
import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

export default function BannerProjet({ className }: { className?: string }) {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  return (
    <div className={`bg-dsfr-background-alt-blue-france py-8 ${className} min-h-[8rem]`}>
      {currentProjet && (
        <div className="fr-container flex flex-row font-bold text-dsfr-text-label-blue-france">
          <div className="mr-6">
            <PictoEspaceSelector pictoId={currentProjet.type_espace as PictoId} withBackground height={55} width={55} />
          </div>
          <div>
            <div className="mb-3">
              <Link href={PFMV_ROUTES.ESPACE_PROJET_LISTE}>
                <div>
                  <i className="ri-map-pin-line fr-icon--sm text-sm mr-1"></i>
                  {currentProjet.collectivite.nom}
                </div>
              </Link>
            </div>
            <Link href={PFMV_ROUTES.TABLEAU_DE_BORD(currentProjet.id)} className="text-[1.375rem] mb-1">
              <div>{currentProjet.nom}</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
