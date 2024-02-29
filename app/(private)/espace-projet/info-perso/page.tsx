import React from "react";
import { auth } from "@/lib/next-auth/auth";
import { UserInfoForm } from "@/forms/user/UserInfoForm";
import UserNotFoundError from "@/components/error/UserNotFoundError";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";

export default async function InfoPerso() {
  const session = await auth();
  const user = session && (await getUserWithCollectivites(session.user.id));
  if (!user) {
    return <UserNotFoundError />;
  }
  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h5 !text-dsfr-text-label-blue-france !mb-2">{"J'inscris ou je rejoins une collectivité"}</h1>
      <div className="mb-4">Je vérifie les informations liées à mon compte AgentConnect</div>
      <UserInfoForm user={user} />
    </div>
  );
}
