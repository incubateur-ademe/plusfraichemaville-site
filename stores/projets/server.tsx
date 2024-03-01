import { auth } from "@/lib/next-auth/auth";
import { ProjetStoreClient } from "./client";

import { getUserProjetsAction } from "@/actions/projets/get-user-projets";

export const ProjetStoreServer = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const { projets } = await getUserProjetsAction(userId);

  return <ProjetStoreClient projets={projets} />;
};
