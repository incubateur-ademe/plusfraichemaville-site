import clsx from "clsx";
import Image from "next/image";
type EchelleButtonFilterProps = {
  icon: string;
  label: string;
  isActive: boolean | undefined;
  updater: () => void;
};
export const EchelleButtonFilter = ({ icon, label, isActive, updater }: EchelleButtonFilterProps) => (
  <button className="w-20 min-w-[7rem] !bg-none md:w-36" onClick={updater}>
    <div className={clsx("flex flex-col items-center", isActive && "underline underline-offset-8")}>
      <Image width={50} height={50} src={`/images/echelle/${icon}.svg`} alt="Tous espaces" />
      <div className="text-center text-sm">{label}</div>
    </div>
  </button>
);
