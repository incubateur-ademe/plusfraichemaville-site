import { ALL_NIVEAU_MATURITE, NiveauMaturite } from "@/src/helpers/maturite-projet";
import Button from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { MaturiteProgress } from "./maturite-progress";

type MaturiteProps = {
  compact?: boolean;
};

type CurrentNiveauMaturite = { index: number } & NiveauMaturite;

export const Maturite = ({ compact }: MaturiteProps) => {
  const [show, setShow] = useState(false);
  const [currentNiveau, setCurrentNiveau] = useState<CurrentNiveauMaturite>();

  const toggleShow = () => setShow(!show);
  return (
    <div>
      <div className="flex items-center gap-2">
        <i className="ri-information-line text-pfmv-navy"></i>
        <span className="text-sm font-bold text-pfmv-navy">Maturité du projet : </span>
        <Button onClick={toggleShow} priority="tertiary no outline">
          <div className="relative mr-3 flex items-center justify-center">
            <span>{currentNiveau?.index}</span>
            <MaturiteProgress value={currentNiveau?.index} />
          </div>
          {!compact && currentNiveau?.label}
          <i className="ri-arrow-down-s-line"></i>
        </Button>
      </div>
      {show && (
        <ul className="absolute z-10 w-[490px]">
          {ALL_NIVEAU_MATURITE.map((niveau, index) => (
            <li className="mb-0 p-0" key={index}>
              <Button
                className="h-12 w-full bg-white px-4 py-3 text-sm"
                priority="tertiary no outline"
                onClick={() => setCurrentNiveau({ index: index + 1, ...niveau })}
              >
                {niveau.label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
