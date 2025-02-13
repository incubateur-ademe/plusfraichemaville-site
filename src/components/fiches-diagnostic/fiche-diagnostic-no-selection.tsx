import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { isFicheDiagConfortThermique, isFicheDiagICU } from "@/src/components/fiches-diagnostic/helpers";
import { FicheDiagnosticCard } from "@/src/components/fiches-diagnostic/fiche-diagnostic-card";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";

export const FicheDiagnosticNoSelection = async () => {
  const allFichesDiagnostics = await getAllFichesDiagnostic();
  const icuFichesDiagnostics = allFichesDiagnostics.filter(isFicheDiagICU);
  const confortThermiqueFichesDiagnostics = allFichesDiagnostics.filter(isFicheDiagConfortThermique);
  console.log("icuFichesDiagnostics", icuFichesDiagnostics)
  console.log("allFichesDiagnostics", allFichesDiagnostics)

  return (
    <>
      <div className="fr-container">
        <h1 className="mb-2 text-2xl font-bold">
          Choisir la bonne prestation de diagnostic de la surchauffe pour mon projet
        </h1>
        <div className="mt-4">
          Cette rubrique vous aide à <strong> choisir la méthode de diagnostic adaptée </strong> pour commander une
          prestation auprès d’un bureau d’études. Elle vous oriente vers les études qui correspondent à votre projet,
          que ce soit pour évaluer l’impact du phénomène d’îlot de chaleur urbain sur votre commune ou le ressenti
          thermique des habitants dans un espace précis. À noter : ces deux approches se complètent souvent !
        </div>
        <hr className="mt-12 pb-8" />
        <div className="max-w-96 text-xl text-dsfr-text-label-blue-france">
          Est-ce que mon projet permet de lutter contre le phénomène <strong>d’îlot de chaleur urbain ?</strong>
          <span className="fr-icon-information-line ml-3 before:mb-[-1px]" aria-hidden="true"></span>
        </div>
      </div>
      <div className="bg-background-diag-icu">
        <div className="fr-container flex gap-10 py-6">
          <div className="w-60">
            Consulter et sélectionner les méthodes de diagnostic pour évaluer l’ICU de votre projet.
          </div>
          <div className="flex gap-6">
            {icuFichesDiagnostics.map((fd) => (
              <FicheDiagnosticCard key={fd.id} ficheDiagnostic={fd} />
            ))}
          </div>
        </div>
      </div>
      <div className="fr-container">
        <div className="mt-8 max-w-[28rem] text-xl text-dsfr-text-label-blue-france">
          Comment savoir si mon projet va permettre d’améliorer le <strong>confort thermique </strong> des habitants ?
          <span className="fr-icon-information-line ml-3 before:mb-[-1px]" aria-hidden="true"></span>
        </div>
      </div>
      <div className="bg-background-confort-thermique">
        <div className="fr-container flex gap-10 py-6">
          <div className="w-60">Consulter et sélectionner les méthodes de mesure d’inconfort thermique.</div>
          <div className="flex gap-6">
            {confortThermiqueFichesDiagnostics.map((fd) => (
              <FicheDiagnosticCard
                overrideUtiliteFiche={FicheDiagnosticUtilite.ConfortThermique}
                key={fd.id}
                ficheDiagnostic={fd}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
