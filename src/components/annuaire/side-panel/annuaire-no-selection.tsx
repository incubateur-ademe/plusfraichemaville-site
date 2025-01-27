import Image from "next/image";

export const AnnuaireNoSelection = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-9">
      <Image src="/images/annuaire/annuaire-no-selection.svg" width={80} height={80} alt="" className="mb-4" />
      <h2 className="mb-4 text-lg">Explorez la carte</h2>
      <p className="mb-7 text-center">Cliquez sur un point pour zoomer sur la zone, ou utilisez la barre de filtre.</p>
      <p className="mb-1 text-center">{"Vous pouvez également utiliser l'action rapide"}</p>
      <p>
        {"'"}
        <i className="ri-home-7-line text-dsfr-action-high-red-hover before:!w-[22px]"></i> Les projets autour de moi.
        {"'"}
      </p>
    </div>
  );
};
