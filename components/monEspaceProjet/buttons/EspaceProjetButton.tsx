"use client";

import { Connected } from "./EspaceProjetButtonConnected";
import { Disconnected } from "./EspaceProjetButtonDisconnected";
import { useSession } from "next-auth/react";

export const EspaceProjetButton = () => {
  const { status } = useSession();

  return <div className="hidden lg:block">{status === "authenticated" ? <Connected /> : <Disconnected />}</div>;
};
