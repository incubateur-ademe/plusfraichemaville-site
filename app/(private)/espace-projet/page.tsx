"use client";

import { ClimadiagPanel } from "@/components/climadiag/climadiag-panel";
import { ListProjets } from "@/components/liste-projets";
import { useUserStore } from "@/stores/user/provider";

export default function ListProjetsPage() {
  const userInfos = useUserStore((state) => state.userInfos);
  return (
    <div>
      <ListProjets />
      {userInfos?.id && <ClimadiagPanel userId={userInfos.id} />}
    </div>
  );
}
