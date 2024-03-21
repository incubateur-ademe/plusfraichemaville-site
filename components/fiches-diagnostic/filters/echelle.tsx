import { EchelleButtonFilter } from "./echelle-button";

export const ALL_ECHELLES = [
  { label: "Sur le territoire", code: "territoire", icon: "echelle-territoire" },
  { label: "Sur un espace", code: "espace", icon: "echelle-espace" },
];

export const EchelleFilter = () => {
  return (
    <div className="flex flex-row flex-wrap mb-8 mt-8 md:ml-52 justify-center md:justify-normal">
      <EchelleButtonFilter icon="echelle-toutes" label="Toutes les échelles"></EchelleButtonFilter>
      {ALL_ECHELLES.map((echelle) => (
        <EchelleButtonFilter {...echelle} key={echelle.code} />
      ))}
    </div>
  );
};
