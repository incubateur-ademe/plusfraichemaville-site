import { isUltramarineCodePostal } from "@/src/helpers/collectivite";
import { clsx } from "clsx";

export const UltramarinePricesNotice = ({
  codePostal,
  className,
}: {
  codePostal?: string | null;
  className?: string;
}) => {
  if (!isUltramarineCodePostal(codePostal)) {
    return null;
  }

  return (
    <div className={clsx("", className)}>
      <i className="ri-information-fill mr-1" />
      Estimations fondées sur des références de coûts hexagonales ; des écarts peuvent être observés en territoires
      ultramarins
    </div>
  );
};
