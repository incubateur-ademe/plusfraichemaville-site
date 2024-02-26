"use client";

import { useUserStore } from "@/stores/user";

import { Connected } from "./EspaceProjetButtonConnected";
import { Disconnected } from "./EspaceProjetButtonDisconnected";

export const EspaceProjetButton = () => {
  const session = useUserStore((state) => state.session);

  return session ? <Connected /> : <Disconnected />;
};
