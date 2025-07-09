"use client";
import styles from "./AideDecisionBreadcrumbsStyles.module.css";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { AIDE_DECISION_BREADCRUMB_FIL_ARIANE } from "@/src/helpers/matomo/matomo-tags";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function AideDecisionBreadcrumbLink({
  label,
  slug,
  currentPageLabel,
}: {
  label: string;
  slug: string;
  currentPageLabel: string;
}) {
  return (
    <LinkWithoutPrefetch
      className={`${styles.content} !bg-none hover:underline`}
      href={`${PFMV_ROUTES.AIDE_DECISION}/${slug}`}
      onClick={() => {
        trackEvent(AIDE_DECISION_BREADCRUMB_FIL_ARIANE(currentPageLabel || ""));
      }}
    >
      {label}
    </LinkWithoutPrefetch>
  );
}
