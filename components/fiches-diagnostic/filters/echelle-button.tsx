import clsx from "clsx";
import Image from "next/image";
type EchelleButtonFilterProps = {
  icon: string;
  label: string;
  isActive: boolean | undefined;
  updater: () => void;
};
export const EchelleButtonFilter = ({ icon, label, isActive, updater }: EchelleButtonFilterProps) => (
  <button className="!bg-none w-20 md:w-36" onClick={updater}>
    <div className={clsx("flex flex-col items-center", isActive && "underline underline-offset-8")}>
      <Image width={50} height={50} src={`/images/echelle/${icon}.svg`} alt="Tous espaces" />
      <div className="text-sm text-center">{label}</div>
    </div>
  </button>
);
