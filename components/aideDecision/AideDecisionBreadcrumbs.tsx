import { AideDecisionEtapeHistory } from "@/lib/directus/queries/commonFilters";
import styles from "./AideDecisionBreadcrumbsStyles.module.css";

export default function AideDecisionBreadcrumbs({
  historique,
  currentPageLabel,
  className,
}: {
  historique: AideDecisionEtapeHistory[];
  currentPageLabel: string;
  className?: string;
}) {
  return (
    <div className={`w-40 mt-60 ${className}`}>
      {historique.map((step, index) => (
        <div className={`${styles.step}`} key={index}>
          <div>
            <div className={`${styles.circle}`}>{index + 1}</div>
          </div>
          <div>
            {/*<div className={`${styles.title}`}>{step.label}</div>*/}
            <div className={`${styles.title}`}>FRFRE FRE REF FRE FRE RFE RFE RE RFE FRE FRE</div>
          </div>
        </div>
      ))}
      <div className={`${styles.step}`}>
        <div>
          <div className={`${styles.circle}`}>{historique.length + 1}</div>
        </div>
        <div>
          <div className={`${styles.title} font-bold`}>{currentPageLabel}</div>
        </div>
      </div>
    </div>
  );
}
