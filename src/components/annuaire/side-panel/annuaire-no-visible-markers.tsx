import Image from "next/image";

export const AnnuaireNoVisibleMarkers = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-9">
      <Image src="/images/annuaire/annuaire-no-selection.svg" width={80} height={80} alt="" className="mb-4" />
      <h2 className="mb-4 text-lg">Aucun projet dans cette zone</h2>
      <p className="mb-7 text-center">
        Déplacez la carte pour faire apparaître des projets, ou utilisez la recherche par adresse.
      </p>
    </div>
  );
};
