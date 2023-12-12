import React from "react";
import solutionDouceIcon from "../public/images/solution-douce.svg";
import Image from "next/image";

type TypeSolution = {
  label: string;
  code: string;
  bannerClass: string;
  icon: (_?: string) => React.ReactNode;
  coloredIcon: (_?: string) => React.ReactNode;
};
export const ALL_TYPES_SOLUTION: TypeSolution[] = [
  {
    code: "verte",
    label: "Solution verte",
    bannerClass: " greenSolutionBanner ",
    icon: (extraClasses?) => <i className={`fr-icon-leaf-fill ${extraClasses}`} />,
    coloredIcon: (extraClasses?) => <i className={`fr-icon-leaf-fill typeSolutionGreenIcon ${extraClasses}`} />,
  },
  {
    code: "bleue",
    label: "Solution bleue",
    bannerClass: " blueSolutionBanner ",
    icon: (extraClasses?) => <i className={`ri-drop-fill ${extraClasses}`} />,
    coloredIcon: (extraClasses?) => <i className={`ri-drop-fill ${extraClasses}`} />,
  },
  {
    code: "grise",
    label: "Solution grise",
    bannerClass: " graySolutionBanner ",
    icon: (extraClasses?) => <i className={`ri-home-fill ${extraClasses}`} />,
    coloredIcon: (extraClasses?) => <i className={`ri-home-fill ${extraClasses}`} />,
  },
  {
    code: "douce",
    label: "Solution douce",
    bannerClass: " softSolutionBanner ",
    icon: (extraClasses?) => <Image src={solutionDouceIcon} className={extraClasses} alt="Solution douce" />,
    coloredIcon: (extraClasses?) => <Image src={solutionDouceIcon} className={extraClasses} alt="Solution douce" />,
  },
];

export const getTypeSolutionFromCode = (typeSolutionCode?: string | null) =>
  typeSolutionCode ? ALL_TYPES_SOLUTION.find((r) => r.code === typeSolutionCode) : null;
