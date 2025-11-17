import Image from "next/image";

export const AnnuaireOnlyVisibleClusters = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-9">
      <Image src="/images/annuaire/annuaire-no-selection.svg" width={80} height={80} alt="" className="mb-4" />
      <h2 className="mb-4 text-lg">Zoomez la carte pour voir les projets</h2>
      <p className="mb-7 text-center">
        Cliquez sur un groupe pour voir les projets, ou utilisez la recherche par adresse.
      </p>
    </div>
  );
};
