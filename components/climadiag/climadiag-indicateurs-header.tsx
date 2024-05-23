export const ClimadiagIndicateursHeader = ({ city }: { city: string }) => {
  return (
    <div className=" text-xl font-bold">
      <i className="ri-map-pin-line before:!w-[14px] mr-1"></i>
      {city}
    </div>
  );
};
