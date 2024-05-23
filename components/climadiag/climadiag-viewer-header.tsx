import Image from "next/image";

export const ClimadiagViewerHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="fr-logo">
          République
          <br />
          Française
        </div>

        <Image height={75} width={200} src="/images/logo-ademe-pfmv.svg" alt="ADEME - Plus fraîche ma ville" />
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Image
          src="/images/climadiag/climadiag-meteo-france.png"
          width={136}
          height={48}
          alt="Logo Météo France Climadiag"
        />
        <Image src="/images/climadiag/meteo-france.svg" width={48} height={48} alt="Logo Météo France" />
      </div>
    </div>
  );
};
