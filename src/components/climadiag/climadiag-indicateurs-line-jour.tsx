import clsx from "clsx";

type ClimadiagIndicateursJourProps = {
  withBackground?: boolean;
  valeur?: "basse" | "médiane" | "haute";
  jour: number | null;
};
export const ClimadiagIndicateursLineJour = ({ withBackground, valeur, jour }: ClimadiagIndicateursJourProps) => {
  return (
    <div
      className={clsx(
        withBackground && "bg-dsfr-background-default-grey-hover",
        "flex h-[125px]  w-[130px] flex-col justify-center rounded-2xl pl-4",
      )}
    >
      <div
        className={clsx(
          "font-bold",
          valeur === "basse" && "text-pfmv-climadiag-yellow",
          valeur === "médiane" && "text-pfmv-climadiag-orange",
          valeur === "haute" && "text-pfmv-climadiag-red",
          !valeur && "text-pfmv-grey",
        )}
      >
        {!jour && jour !== 0 ? (
          <span className="text-4xl ">N.R.</span>
        ) : (
          <>
            <span className="text-4xl ">{Math.round(jour)} </span>
            {Math.round(jour) > 1 ? "jours" : "jour"}
          </>
        )}
      </div>
      <div className="text-sm text-pfmv-grey">
        <span className="block">valeur</span>
        <span>{valeur ?? "de référence"}</span>
      </div>
    </div>
  );
};
