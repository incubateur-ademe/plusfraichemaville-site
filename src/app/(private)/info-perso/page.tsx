import { auth } from "@/src/lib/next-auth/auth";
import { UserInfoForm } from "@/src/forms/user/UserInfoForm";
import UserNotFoundError from "@/src/components/error/UserNotFoundError";
import { getUserWithCollectivites } from "@/src/lib/prisma/prismaUserQueries";
import { hasAllRequiredFieldsSet } from "@/src/helpers/user";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Votre profil");

export default async function InfoPerso() {
  const session = await auth();
  const user = session && (await getUserWithCollectivites(session.user.id));
  if (!user) {
    return <UserNotFoundError />;
  }
  const isUserComplete = hasAllRequiredFieldsSet(user);
  return (
    <div className="fr-container pt-8">
      {!isUserComplete ? (
        <>
          <h1 className="fr-h5 !mb-2 !text-dsfr-text-label-blue-france">
            {"J'inscris ou je rejoins une collectivité"}
          </h1>
          <div className="mb-4">Je vérifie les informations liées à mon compte AgentConnect</div>
        </>
      ) : (
        <h1 className="fr-h5 !mb-2 !text-dsfr-text-label-blue-france">{"Mon profil"}</h1>
      )}
      <UserInfoForm
        user={user}
        buttonLabel={isUserComplete ? "Valider mes informations" : "Je rejoins l'espace projet de ma collectivité"}
      />
    </div>
  );
}
