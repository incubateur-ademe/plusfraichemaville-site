import { formatNumberWithSpaces } from "@/src/helpers/common";

type EstimationMateriauGlobalPriceFooterProps = {
  title?: string;
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
      {title && <div className="mt-8 text-[1.375rem] font-bold">{`Estimation pour ${title}`}</div>}
      <div className="ml-auto mr-0 mt-8 flex max-w-[30rem] flex-row justify-between text-[1.375rem] font-bold">
        <div>Investissement :</div>
        <div>
          <strong>{`${formatNumberWithSpaces(investissementMin)} - ${formatNumberWithSpaces(
            investissementMax,
          )} € `}</strong>
          HT
        </div>
      </div>
      <div className="mb-6 ml-auto mr-0 mt-2 flex max-w-[30rem] flex-row justify-between text-lg">
        <div>Entretien :</div>
        <div>
          <strong>{`${formatNumberWithSpaces(entretienMin)} - ${formatNumberWithSpaces(entretienMax)} € `}</strong>HT
          par an
        </div>
      </div>
    </>
  );
}
