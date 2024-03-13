import { auth } from "@/lib/next-auth/auth";
import { UserInfoForm } from "@/forms/user/UserInfoForm";
import UserNotFoundError from "@/components/error/UserNotFoundError";
import { getUserWithCollectivites } from "@/lib/prisma/prismaUserQueries";
import { hasAllRequiredFieldsSet } from "@/helpers/user";

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
          <h1 className="fr-h5 !text-dsfr-text-label-blue-france !mb-2">
            {"J'inscris ou je rejoins une collectivité"}
          </h1>
          <div className="mb-4">Je vérifie les informations liées à mon compte AgentConnect</div>
        </>
      ) : (
        <h1 className="fr-h5 !text-dsfr-text-label-blue-france !mb-2">{"Mon profil"}</h1>
      )}
      <UserInfoForm
        user={user}
        buttonLabel={isUserComplete ? "Valider mes informations" : "Je rejoins l'espace projet de ma collectivité"}
      />
    </div>
  );
}
