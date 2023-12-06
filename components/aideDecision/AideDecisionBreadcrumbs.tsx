import { AideDecisionEtapeHistory } from "@/lib/directus/queries/commonFilters";
import styles from "./AideDecisionBreadcrumbsStyles.module.css";
import Link from "next/link";

export default function AideDecisionBreadcrumbs({
  historique,
  currentPageLabel,
  className,
}: {
  historique: AideDecisionEtapeHistory[];
  currentPageLabel?: string | null;
  className?: string;
}) {
  return (
    <div className={`w-52 mt-60 ${className}`}>
      {historique.map((step, index) => (
        <div className={`${styles.step}`} key={index}>
          <div className={`${styles.vStepper}`}>
            <div className={`${styles.circle} text-xs text-center`}>{index + 1}</div>
            <div className={`${styles.line}`}/>
          </div>
          <Link className={`${styles.content} bg-none hover:underline`} href={step.slug}>{step.label}</Link>
        </div>
      ))}
      {currentPageLabel && (
        <div className={`${styles.step}`}>
          <div className={`${styles.vStepper}`}>
            <div className={`${styles.circle} text-xs text-center`}>{historique.length + 1}</div>
            <div className={`${styles.line}`}/>
          </div>
          <div className={`${styles.content} font-bold`}>{currentPageLabel}</div>
        </div>
      )}
    </div>
  );
}
