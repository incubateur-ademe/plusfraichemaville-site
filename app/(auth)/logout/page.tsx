"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const session = useSession();
  const isLogout = useSearchParams().get("state") || session.status === "unauthenticated";
  useEffect(() => {
    if (session.data) {
      const callbackUrl = `/logout/agentconnect?id_token_hint=${session.data?.id_token}`;
      signOut({ redirect: false, callbackUrl }).then((signOutResponse) => router.push(signOutResponse.url));
    } else if (isLogout) {
      redirect("/");
    }
  }, [isLogout, router, session]);

  return <div />;
}
