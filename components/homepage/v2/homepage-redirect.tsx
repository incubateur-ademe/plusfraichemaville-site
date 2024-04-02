"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const HomepageRedirect = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push(PFMV_ROUTES.ESPACE_PROJET);
    }
  }, [router, session.status]);
  return null;
};
