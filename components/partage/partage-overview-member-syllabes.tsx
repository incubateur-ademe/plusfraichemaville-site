import { extractNameSyllables } from "@/helpers/common";
import clsx from "clsx";

type PartageOverviewMemberSyllabesProps = {
  name?: string | null;
  active?: boolean;
};

export const PartageOverviewMemberSyllabes = ({ name, active }: PartageOverviewMemberSyllabesProps) => {
  const syllabes = name ? extractNameSyllables(name) : "-";

  return (
    <div
      className={clsx(
        "flex size-9 items-center justify-center rounded-full text-sm font-bold text-white",
        active ? "bg-dsfr-background-flat-info" : "bg-dsfr-background-action-high-purple-glycine-hover",
      )}
    >
      {syllabes}
    </div>
  );
};
