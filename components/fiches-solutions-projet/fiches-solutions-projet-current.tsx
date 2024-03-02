import FicheSolutionFullCard from "../ficheSolution/FicheSolutionFullCard";
import { FichesSolutionsProjetEmpty } from ".";

import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FicheSolution } from "../ficheSolution/type";

export const FichesSolutionsProjetsCurrent = ({ fichesSolutions }: { fichesSolutions: FicheSolution[] }) => {
  const pathname = usePathname();
  const tableauDeBordUrl = pathname.replace("/fiches-solutions", "/tableau-de-bord");

  if (!fichesSolutions) {
    return <FichesSolutionsProjetEmpty />;
  }

  return (
    <div>
      <div className="flex gap-8 mb-10">
        {fichesSolutions?.map((ficheSolution, index) => (
          <FicheSolutionFullCard ficheSolution={ficheSolution} key={index} />
        ))}
      </div>
      {!fichesSolutions ? (
        <Link className="fr-btn rounded-3xl" href={tableauDeBordUrl}>
          Retour au tableau de bord
        </Link>
      ) : (
        <Button className="rounded-3xl">Valider ma sélection</Button>
      )}
    </div>
  );
};
