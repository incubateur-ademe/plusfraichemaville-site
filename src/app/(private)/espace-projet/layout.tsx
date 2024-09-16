"use client";
import React, { ReactElement } from "react";
import { useUserStore } from "@/src/stores/user/provider";
import { hasAllRequiredFieldsSet } from "@/src/helpers/user";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export default function Layout({ children }: { children: ReactElement | null }) {
  const user = useUserStore((state) => state.userInfos);
  const router = useRouter();
  if (user && !hasAllRequiredFieldsSet(user)) {
    return router.push(PFMV_ROUTES.MON_PROFIL);
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
