"use client";
import { useUserStore } from "@/src/stores/user/provider";
import { AgentConnectInfo } from "@/src/lib/prisma/prismaCustomTypes";
import clsx from "clsx";

export const ContactIframe = ({ className }: { className?: string }) => {
  const user = useUserStore((state) => state.userInfos);
  const userEmail = user?.email;
  const userSiret = (user?.agentconnect_info as AgentConnectInfo | null)?.siret;
  const queryParams = {
    ...(userEmail && { email: userEmail }),
    ...(user?.nom && { nom: user.nom }),
    ...(user?.prenom && { nom: user.prenom }),
    ...(userSiret && { siret: userSiret }),
  };
  const searchParams = new URLSearchParams(queryParams);

  return (
    <iframe className={clsx("w-full", className)} src={`https://cloud.contact.ademe.fr/contact-pfmv?${searchParams}`} />
  );
};
