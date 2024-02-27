import { PictoCour } from "./Cour";
import { Pictoplace } from "./Place";

const pictos = {
  cour: <PictoCour />,
  place: <Pictoplace />,
};
export const PictoEspaceSelector = ({ pictoId }: { pictoId: keyof typeof pictos }) => {
  const selectedPicto = pictos[pictoId];
  return (
    <div className={`w-20 h-20 relative flex justify-center items-center`}>
      <div className="absolute inset-0 w-full h-full -z-1 rounded-xl bg-[var(--blue-france-850-200)]"></div>
      <div className="z-10">{selectedPicto}</div>
    </div>
  );
};
