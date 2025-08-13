import Image from "next/image";

export const IndienResultPdfHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <Image
          height={80}
          width={100}
          src="/images/climadiag/republique-francaise-logo.jpg"
          alt="Logo République Française"
        />
        <Image height={75} width={200} src="/images/logo-ademe-pfmv.svg" alt="ADEME - Plus fraîche ma ville" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Image
          src="/images/fiches-diagnostic/indicateurs-environnementaux/logo-tribu.jpg"
          width={136}
          height={136}
          alt="Logo du bureau d'étude TRIBU"
          className="ml-4 w-12"
        />
      </div>
    </div>
  );
};
