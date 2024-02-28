import { ProjetStoreClient } from "./client";

import { getUserProjetsAction } from "@/actions/projets/get-user-projets";

export const ProjetStoreServer = async () => {
  const { projets } = await getUserProjetsAction();

  return <ProjetStoreClient projets={projets} />;
};
