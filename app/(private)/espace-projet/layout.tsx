"use client";
import React, { ReactElement } from "react";
import { useUserStore } from "@/stores/user/provider";
import { hasAllRequiredFieldsSet } from "@/helpers/user";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function Layout({ children }: { children: ReactElement | null }) {
  const user = useUserStore((state) => state.userInfos);
  const router = useRouter();
  if (user && !hasAllRequiredFieldsSet(user)) {
    router.push(PFMV_ROUTES.MON_PROFIL);
  }
  return (
    <>
      <div>{children}</div>
    </>
  );
}
