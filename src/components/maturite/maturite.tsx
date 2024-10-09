"use client";

import { ALL_NIVEAU_MATURITE, getNiveauMaturiteByCode, NiveauMaturite } from "@/src/helpers/maturite-projet";
import Button from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { MaturiteProgress } from "./maturite-progress";
import clsx from "clsx";
import { updateMaturiteProjetAction } from "@/src/actions/projets/update-maturite-projet-action";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { notifications } from "../common/notifications";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";

type MaturiteProps = {
  niveau: string | null;
  projetId: number;
  withLabel?: boolean;
};

type CurrentNiveauMaturite = NiveauMaturite | undefined;

export const Maturite = ({ withLabel, niveau, projetId }: MaturiteProps) => {
  const [show, setShow] = useState(false);
  const [currentNiveau, setCurrentNiveau] = useState<CurrentNiveauMaturite>(getNiveauMaturiteByCode(niveau));
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const isLecteur = useIsLecteur(projetId);

  const toggleShow = () => setShow(!show);
  const closer = () => setShow(false);

  const handleUpdateMaturiteProjet = async (niveau: NiveauMaturite["code"]) => {
    if (projetId) {
      const result = await updateMaturiteProjetAction(projetId, niveau);
      if (result.projet) {
        addOrUpdateProjet(result.projet);
      }
      notifications(result.type, result.message);
    }
  };

  return (
    <div
      className={clsx(
        "relative w-fit",
        !isLecteur && "border-b border-b-pfmv-grey-dashed/25 hover:border-b-pfmv-grey-dashed",
      )}
      aria-describedby={`tooltip-maturite`}
    >
      <Button
        onClick={toggleShow}
        priority="tertiary no outline"
        className={clsx("relative !p-0 hover:!bg-white", isLecteur && "cursor-default")}
      >
        <span
          className={clsx("fr-tooltip fr-placement", withLabel ? "!hidden" : show && "!hidden")}
          id={`tooltip-maturite`}
          role="tooltip"
          aria-hidden="true"
        >
          {currentNiveau?.label}
        </span>
        <MaturiteProgress value={currentNiveau?.avancement} />
        <span className={clsx("font-normal text-black", withLabel && "mr-4")}>{withLabel && currentNiveau?.label}</span>
        {!isLecteur && <i className="ri-arrow-down-s-line text-black"></i>}
      </Button>
      {show && !isLecteur && (
        <>
          {show && <div className="fixed inset-0 z-[1] h-screen w-screen" onClick={closer} />}
          <ul
            className={clsx(
              "absolute top-[calc(100%_+_12px)] z-10 m-0 block w-[600px] bg-white p-0 shadow-pfmv-card-shadow",
            )}
          >
            {ALL_NIVEAU_MATURITE.map((niveau, index) => (
              <li className="relative mb-0 list-none p-0" key={index}>
                <div
                  className={clsx(
                    "absolute left-0 top-1/2 z-[2] h-6 w-0.5 -translate-y-1/2 bg-pfmv-navy",
                    index + 1 === currentNiveau?.avancement ? "block" : "hidden",
                  )}
                ></div>
                <Button
                  className="h-12 !w-full bg-white px-4 py-3 text-sm"
                  priority="tertiary no outline"
                  onClick={() => {
                    setCurrentNiveau(niveau);
                    handleUpdateMaturiteProjet(niveau.code);
                    setShow(false);
                  }}
                >
                  <MaturiteProgress value={niveau.avancement} />
                  <span
                    className={clsx(
                      "ml-3 text-left font-normal",
                      index + 1 === currentNiveau?.avancement ? "text-pfmv-navy" : "text-black",
                    )}
                  >
                    {niveau.label}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
