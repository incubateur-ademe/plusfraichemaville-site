"use client";

import React, { PropsWithChildren } from "react";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { APIResponseData } from "@/lib/strapi/types/types";

type FicheSolutionCardWithUserInfoProps = {
  ficheSolution: APIResponseData<"api::fiche-solution.fiche-solution">;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
} & PropsWithChildren;
export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  extraUrlParams,
  className = "",
  children,
}: FicheSolutionCardWithUserInfoProps) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      {children}
    </div>
  );
}
