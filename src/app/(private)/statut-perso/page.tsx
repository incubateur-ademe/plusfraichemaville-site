import { auth } from "@/src/lib/next-auth/auth";
import UserNotFoundError from "@/src/components/error/UserNotFoundError";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { StatutUserPage } from "@/src/components/espace-projet/statut-user/statut-user-page";

export const metadata: Metadata = computeMetadata("Votre retour");
export default async function StatutPerso() {
  const session = await auth();
  const user = session && (await getUserWithCollectivites(session.user.id));
  if (!user) {
    return <UserNotFoundError />;
  }
  return (
    <div className="fr-container pt-8">
      <StatutUserPage />
    </div>
  );
}
