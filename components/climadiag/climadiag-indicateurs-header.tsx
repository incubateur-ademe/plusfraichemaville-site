type ClimadiagIndicateursHeaderProps = {
  city: string;
  isPDF?: boolean;
};

export const ClimadiagIndicateursHeader = ({ city, isPDF }: ClimadiagIndicateursHeaderProps) => {
  return (
    <div className=" text-xl font-bold mb-4">
      {!isPDF && <i className="ri-map-pin-line before:!w-[14px] mr-1"></i>}
      {city}
    </div>
  );
};
