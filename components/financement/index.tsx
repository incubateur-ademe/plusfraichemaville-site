import { AideListeEmptyAdd } from "./aide/aide-liste-empty-add";

export const Financement = async () => {
  return (
    <div className="fr-container pt-6">
      <h1 className="mb-0 text-[28px]">Je trouve des financements et des aides techniques</h1>
      <AideListeEmptyAdd />
    </div>
  );
};
