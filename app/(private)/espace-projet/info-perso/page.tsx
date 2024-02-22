import React from "react";
import { auth } from "@/lib/next-auth/auth";
import { prismaClient } from "@/lib/prisma/prismaClient";
import { UserInfoForm } from "@/forms/user/UserInfoForm";
import UserNotFoundError from "@/components/error/UserNotFoundError";

export default async function InfoPerso() {
  const session = await auth();
  const user = await prismaClient.user.findUnique({ where: { email: session?.user?.email ?? undefined } });
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
