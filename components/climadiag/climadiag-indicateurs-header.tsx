type ClimadiagIndicateursHeaderProps = {
  city: string;
  viewer?: boolean;
};

export const ClimadiagIndicateursHeader = ({ city, viewer }: ClimadiagIndicateursHeaderProps) => {
  return (
    <div className=" text-xl font-bold mb-4">
      {!viewer && <i className="ri-map-pin-line before:!w-[14px] mr-1"></i>}
      {city}
    </div>
  );
};
