import Image from "next/image";
type EchelleButtonFilterProps = {
  icon: string;
  label: string;
};
export const EchelleButtonFilter = ({ icon, label }: EchelleButtonFilterProps) => (
  <button className={`!bg-none w-20 md:w-36`}>
    <div className={"flex flex-col items-center"}>
      <Image width={50} height={50} src={`/images/echelle/${icon}.svg`} alt="Tous espaces" />
      <div className={"text-sm text-center"}>{label}</div>
    </div>
  </button>
);
