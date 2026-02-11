"use client";
import { useUserStore } from "@/src/stores/user/provider";
import clsx from "clsx";
import { AgentConnectInfo } from "@/src/lib/prisma/prismaCustomTypes";

export const NewsletterIframe = ({ className }: { className?: string }) => {
  const user = useUserStore((state) => state.userInfos);
  const userEmail = user?.email;
  const userSiret = (user?.agentconnectInfo as AgentConnectInfo | null)?.siret;
  const queryParams = {
    ...(userEmail && { email: userEmail }),
    ...(userSiret && { siret: userSiret }),
  };
  const searchParams = new URLSearchParams(queryParams);

  return (
    <iframe
      className={clsx("h-[40rem] w-full", className)}
      src={`https://cloud.contact.ademe.fr/inscription-PFMV?${searchParams}`}
    />
  );
};
