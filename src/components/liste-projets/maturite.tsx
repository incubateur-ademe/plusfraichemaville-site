import { ALL_NIVEAU_MATURITE, NiveauMaturite } from "@/src/helpers/maturiteProjet";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { useState } from "react";

type MaturiteProps = {
  compact?: boolean;
};

// bleu clair : dsfr-border-action-low-blue-france
// gris clair : dsfr-border-default-grey

export const Maturite = ({ compact }: MaturiteProps) => {
  const [show, setShow] = useState(false);
  const [currentNiveau, setCurrentNiveau] = useState<NiveauMaturite>();

  const toggleShow = () => setShow(!show);
  return (
    <div>
      <i className="ri-information-line"></i>
      <Button onClick={toggleShow} priority="tertiary no outline">
        <div
          className={clsx(
            "relative size-4 text-sm font-bold",
            "rounded-full border-[2px] border-dsfr-border-action-low-blue-france ",
          )}
        >
          <div className={clsx("absolute left-0 top-0 size-4", "rounded-full border-[2px] border-pfmv-navy")}></div>1
        </div>

        {!compact && currentNiveau?.label}
        <i className="ri-arrow-down-s-line"></i>
      </Button>
      {show && (
        <ul>
          {ALL_NIVEAU_MATURITE.map((niveau, index) => (
            <li key={index}>
              <Button onClick={() => setCurrentNiveau(niveau)}>{niveau.label}</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
