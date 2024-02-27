import { ListeProjetsCard } from "@/components/liste-projets/card";
import { auth } from "@/lib/next-auth/auth";
import { getUserProjets } from "@/lib/prisma/prismaUserQueries";
import { ListeProjetsHeader } from "./header";
import { ProjetStoreClient } from "@/stores/projets/projet-store-client";

export const ListProjets = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }
  const projets = await getUserProjets(userId);

  return (
    <div className="bg-dsfr-background-alt-blue-france">
      <ProjetStoreClient projets={projets} />
      <div className="fr-container py-10 min-h-[19.5rem]">
        <ListeProjetsHeader isListEmpty={projets.length === 0} />
        {projets.map((projet, index) => (
          <ListeProjetsCard projet={projet} key={index} />
        ))}
      </div>
    </div>
  );
};
