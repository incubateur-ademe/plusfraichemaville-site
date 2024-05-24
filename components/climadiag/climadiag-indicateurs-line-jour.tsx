import clsx from "clsx";

type ClimadiagIndicateursJourProps = {
  withBackground?: boolean;
  valeur?: "basse" | "médiane" | "haute";
  jour: number;
};
export const ClimadiagIndicateursLineJour = ({ withBackground, valeur, jour }: ClimadiagIndicateursJourProps) => {
  return (
    <div
      className={clsx(
        withBackground && "bg-dsfr-background-default-grey-hover",
        "w-[130px] h-[125px]  rounded-2xl flex justify-center flex-col pl-4",
      )}
    >
      <div
        className={clsx(
          "font-bold",
          valeur === "basse" && "text-pfmv-climadiag-yellow",
          valeur === "médiane" && "text-pfmv-climadiag-orange",
          valeur === "haute" && "text-pfmv-climadiag-red",
          !valeur && "text-dsfr-text-disabled-grey",
        )}
      >
        <span className="text-4xl ">{Math.round(jour)} </span>
        {Math.round(jour) > 1 ? "jours" : "jour"}
      </div>
      <div className="text-pfmv-grey text-sm">
        <span className="block">valeur</span>
        <span>{valeur ?? "de référence"}</span>
      </div>
    </div>
  );
};
