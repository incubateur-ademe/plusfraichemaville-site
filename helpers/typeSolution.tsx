import React from "react";
import solutionDouceIcon from "../public/images/solution-douce.svg";
import Image from "next/image";

type TypeSolution = {
  label: string;
  code: string;
  icon: (_?: string) => React.ReactNode;
};
export const ALL_TYPES_SOLUTION: TypeSolution[] = [
  {
    code: "verte",
    label: "Solution verte",
    icon: (extraClasses?) => <i className={`fr-icon-leaf-fill fr-link--icon-left ${extraClasses}`} />,
  },
  {
    code: "bleue",
    label: "Solution bleue",
    icon: (extraClasses?) => <i className={`ri-drop-fill fr-link--icon-left ${extraClasses}`} />,
  },
  {
    code: "grise",
    label: "Solution grise",
    icon: (extraClasses?) => <i className={`ri-home-fill fr-link--icon-left ${extraClasses}`} />,
  },
  {
    code: "douce",
    label: "Solution douce",
    icon: (extraClasses?) => <Image src={solutionDouceIcon} className={`mr-2 ${extraClasses}`} alt="Solution douce" />,
  },
];

export const getTypeSolutionFromCode = (typeSolutionCode?: string | null) =>
  typeSolutionCode ? ALL_TYPES_SOLUTION.find((r) => r.code === typeSolutionCode) : null;