import { ClimadiagIndicateursLine } from "./climadiag-indicateurs-line";

export const ClimadiagViewer = () => {
  return (
    <div id="climadiag-viewer">
      <ClimadiagIndicateursHeader city={`Beauvais 60000`} />

      <ClimadiagIndicateursLine
        temperature={{ prevision: { max: 1, min: 1, median: 1 }, ref: 1 }}
        type="jours_chauds"
      />
      <ClimadiagIndicateursLine
        temperature={{ prevision: { max: 1, min: 1, median: 1 }, ref: 1 }}
        type="nuits_chaudes"
      />
      <ClimadiagIndicateursLine temperature={{ prevision: { max: 1, min: 1, median: 1 }, ref: 1 }} type="jours_vdc" />
    </div>
  );
};
