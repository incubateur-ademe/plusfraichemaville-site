"use client";
import { useUserStore } from "@/src/stores/user/provider";
import { AgentConnectInfo } from "@/src/lib/prisma/prismaCustomTypes";

export const NewsletterIframe = () => {
  const user = useUserStore((state) => state.userInfos);
  const userEmail = user?.email;
  const userSiret = (user?.agentconnect_info as AgentConnectInfo | null)?.siret;
  const queryParams = {
    ...(userEmail && { email: userEmail }),
    ...(userSiret && { siret: userSiret }),
  };
  const searchParams = new URLSearchParams(queryParams);

  return (
    <iframe
      className="h-[40rem] w-full"
      src={`https://cloud.contact.ademe.fr/inscription-PFMV?${searchParams}`}
      allowTransparency
    />
  );
};
