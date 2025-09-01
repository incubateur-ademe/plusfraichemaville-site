"use client";
import { useMultipleValuesFilter } from "@/src/hooks/useMultipleValuesFilter";
import { ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION } from "@/src/helpers/baisseTemperatureFicheSolution";

export default function BaisseTemperatureFilter({ className }: { className?: string }) {
  const FILTER_NAME = "baisseTemperatureFilter";

  const { changeFilter, isFilterCodeSelected } = useMultipleValuesFilter(FILTER_NAME);

  const linkStyle = (codeBaisseTemperature: string) => {
    const baseStyle = " fr-tag fr-text--xs whitespace-nowrap ";
    return isFilterCodeSelected(codeBaisseTemperature) ? "fr-tag--dismiss " + baseStyle : baseStyle;
  };

  return (
    <div>
      <div className="mb-3 text-center text-sm text-dsfr-text-mention-grey md:text-left">Baisse de la température</div>
      <div className={`flex shrink flex-row flex-wrap justify-center gap-4 md:flex-col md:justify-start ${className}`}>
        {ALL_BAISSES_TEMPERATURE_FICHE_SOLUTION.map((baisseTemperature) => (
          <button
            key={baisseTemperature.code}
            onClick={() => changeFilter(baisseTemperature.code)}
            className={linkStyle(baisseTemperature.code)}
            role="checkbox"
            aria-checked={isFilterCodeSelected(baisseTemperature.code)}
          >
            {baisseTemperature.label}
          </button>
        ))}
      </div>
    </div>
  );
}
