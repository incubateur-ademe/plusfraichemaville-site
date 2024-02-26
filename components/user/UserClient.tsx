"use client";

import { useUserStore } from "@/stores/user";
import { Session } from "next-auth";
import { useEffect } from "react";

type UserClientProps = {
  session: Session | null;
};

export const UserClient = ({ session }: UserClientProps) => {
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  return null;
};
