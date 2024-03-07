import { auth } from "@/lib/next-auth/auth";
import { UserStoreClient } from "./client";

export const UserStoreServer = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return <UserStoreClient user={user} />;
};
