"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut({ redirect: false, callbackUrl: "/" }).then((signOutResponse) => router.push(signOutResponse.url));
  }, [router]);

  return <div />;
}
