type EstimationMateriauGlobalPriceFooterProps = {
  title: string;
  investissementMin?: number;
  investissementMax?: number;
  entretienMin?: number;
  entretienMax?: number;
};

export default function EstimationMateriauGlobalPriceFooter({
  title,
  investissementMin,
  investissementMax,
  entretienMin,
  entretienMax,
}: EstimationMateriauGlobalPriceFooterProps) {
  return (
    <>
      <div className="mt-8 text-[1.375rem] font-bold">{`Estimation pour ${title}`}</div>
      <div className="mt-8 text-[1.375rem] font-bold flex flex-row justify-between max-w-[30rem] ml-auto mr-0">
        <div>Investissement :</div>
        <div>
          <strong>{`${investissementMin} - ${investissementMax} € `}</strong>HT
        </div>
      </div>
      <div className="mt-2 mb-6 ml-auto mr-0 text-lg flex flex-row justify-between max-w-[30rem]">
        <div>Entretien :</div>
        <div>
          <strong>{`${entretienMin} - ${entretienMax} € `}</strong>HT par an
        </div>
      </div>
    </>

  );
}
