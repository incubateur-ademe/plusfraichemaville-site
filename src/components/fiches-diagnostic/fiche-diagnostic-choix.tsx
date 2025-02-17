import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";

import CustomAccordion from "../common/CustomAccordion";
import Image from "next/image";
import { FicheDiagnosticChoixFilters } from "./fiche-diagnostic-choix-filters";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Link from "next/link";

export const FicheDiagnosticChoix = async ({ projetId }: { projetId: number }) => {
  const allFichesDiagnostics = await getAllFichesDiagnostic();

  return (
    <div className="fr-container">
      <h1 className="mb-5 text-2xl font-bold">
        Choisir la bonne prestation de diagnostic de la surchauffe pour mon projet
      </h1>
      <p className="mb-24 leading-6">
        Cette rubrique vous aide à <strong>choisir la méthode de diagnostic adaptée</strong> pour commander une
        prestation auprès {"d'un"} bureau d’études. Elle vous oriente vers les études qui correspondent à votre projet,
        que ce soit pour évaluer l’impact du phénomène d’îlot de chaleur urbain sur votre commune ou le ressenti
        thermique des habitants dans un espace précis. À noter : ces deux approches se complètent souvent !
      </p>

      <CustomAccordion
        title="Guide pour choisir des méthodes de diagnostic"
        expanded={false}
        ariaId="guide-choisir-methode-diagnostic"
        className="mb-14 overflow-hidden rounded-2xl shadow-pfmv-card-shadow"
        bgColor="!bg-dsfr-background-alt-blue-france"
        btnTextColor="!text-pfmv-navy"
        btnTextPadding="!pt-6 !pb-10 !py-5"
        picto={
          <Image
            src="/images/fiches-diagnostic/guide.svg"
            alt="Information"
            width={36}
            height={58}
            className="mr-5"
          ></Image>
        }
      >
        <div className="mb-2 mt-4">
          <h2 className="mb-3 text-lg leading-6">Quelle échelle spatiale choisir ?</h2>
          <span className="text-sm">
            Pour un même projet, il est pertinent de combiner les deux échelles de diagnostic.
          </span>
        </div>
      </CustomAccordion>
      <FicheDiagnosticChoixFilters allFichesDiagnostics={allFichesDiagnostics} />
      <div className="mt-14 flex items-center justify-between">
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_TABLEAU_DE_BORD}
          className="fr-btn fr-btn--secondary rounded-3xl"
        >
          Revenir au tableau de bord
        </GenericFicheLink>
        <Link
          href={PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_PRESTATION_SELECTION(projetId)}
          className="fr-btn fr-btn rounded-3xl"
        >
          Valider{" "}
        </Link>
      </div>
    </div>
  );
};
