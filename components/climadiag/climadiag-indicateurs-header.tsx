type ClimadiagIndicateursHeaderProps = {
  city: string;
  isPDF?: boolean;
};

export const ClimadiagIndicateursHeader = ({ city, isPDF }: ClimadiagIndicateursHeaderProps) => {
  return (
    <div className=" mb-4 text-xl font-bold">
      {!isPDF && <i className="ri-map-pin-line mr-1 before:!w-[14px]"></i>}
      {city}
    </div>
  );
};
