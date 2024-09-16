type ClimadiagIndicateursHeaderProps = {
  city: string;
  isPDF?: boolean;
};

export const ClimadiagIndicateursHeader = ({ city, isPDF }: ClimadiagIndicateursHeaderProps) => {
  return (
    <h3 className=" mb-4 text-xl font-bold text-dsfr-text-label-blue-france">
      {!isPDF && <i className="ri-map-pin-line mr-1 before:!w-[14px]"></i>}
      {city}
    </h3>
  );
};
