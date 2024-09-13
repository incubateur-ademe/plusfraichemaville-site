import styles from "./AideDecisionBreadcrumbsStyles.module.css";
import Link from "next/link";
import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";
import { PFMV_ROUTES } from "@/src/helpers/routes";

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
    <div className={`max-w-[14rem] ${className}`}>
      {historique.map((step, index) => (
        <div className={`${styles.step}`} key={index}>
          <div className={`${styles.vStepper}`}>
            <div className={`${styles.circle} text-center text-xs`}>{index + 1}</div>
            <div className={`${styles.line}`} />
          </div>
          <Link
            className={`${styles.content} !bg-none hover:underline`}
            href={`${PFMV_ROUTES.AIDE_DECISION}/${step.slug}`}
          >
            {step.label}
          </Link>
        </div>
      ))}
      {currentPageLabel && (
        <div className={`${styles.step}`}>
          <div className={`${styles.vStepper}`}>
            <div className={`${styles.circle} text-center text-xs`}>{historique.length + 1}</div>
            <div className={`${styles.line}`} />
          </div>
          <div className={`${styles.content} font-bold`}>{currentPageLabel}</div>
        </div>
      )}
    </div>
  );
}
