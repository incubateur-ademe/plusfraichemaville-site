import { auth } from "@/lib/next-auth/auth";
import { UserStoreClient } from "./client";
import { getUserInfoAction } from "@/actions/users/get-user-info-action";

export const UserStoreServer = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return null;
  }

  const userInfos = await getUserInfoAction(user?.id);

  return <UserStoreClient user={userInfos.userInfos} />;
};
