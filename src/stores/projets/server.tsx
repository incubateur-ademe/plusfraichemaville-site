import { auth } from "@/src/lib/next-auth/auth";
import { ProjetStoreClient } from "./client";

import { getUserProjetsAction } from "@/src/actions/projets/get-user-projets-action";
import { getPendingUserProjetsAction } from "@/src/actions/projets/get-pending-user-projets-action";

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
