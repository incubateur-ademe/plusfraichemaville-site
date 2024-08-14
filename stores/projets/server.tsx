import { auth } from "@/lib/next-auth/auth";
import { ProjetStoreClient } from "./client";

import { getUserProjetsAction } from "@/actions/projets/get-user-projets-action";
import { getPendingUserProjetsAction } from "@/actions/projets/get-pending-user-projets-action";

export const ProjetStoreServer = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const { projets } = await getUserProjetsAction(userId);
  const { pendingProjets } = await getPendingUserProjetsAction(userId);

  return <ProjetStoreClient projets={projets} pendingProjets={pendingProjets} />;
};
