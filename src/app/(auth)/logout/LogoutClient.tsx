"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutClient() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data) {
      const callbackUrl = `/logout/agentconnect?id_token_hint=${session.data?.id_token}`;
      signOut({ redirect: false, callbackUrl }).then((signOutResponse) => router.push(signOutResponse.url));
    }
  }, [router, session]);

  return <div />;
}
