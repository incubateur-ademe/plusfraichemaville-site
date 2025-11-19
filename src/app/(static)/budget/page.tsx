import { formatNumberWithSpaces } from "@/src/helpers/common";
import clsx from "clsx";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Budget");

export default function BudgetPage() {
  const data = [
    { category: "Produit / Design", S2_2022: 17241, S1_2023: 67323, S2_2023: 55818, S1_2024: 67423, S2_2024: 88179 },
    { category: "Déploiement", S2_2022: 0, S1_2023: 0, S2_2023: 0, S1_2024: 87969, S2_2024: 169507 },
    { category: "Développement", S2_2022: 0, S1_2023: 0, S2_2023: 60279, S1_2024: 155153, S2_2024: 155209 },
    { category: "Contenus", S2_2022: 17683, S1_2023: 65872, S2_2023: 37745, S1_2024: 43786, S2_2024: 33189 },
    { category: "Coaching", S2_2022: 16128, S1_2023: 46080, S2_2023: 40320, S1_2024: 34560, S2_2024: 33189 },
    { category: "Total", S2_2022: 51052, S1_2023: 179275, S2_2023: 194162, S1_2024: 388891, S2_2024: 478647 },
  ];

  const formatBudget = (value: number) => {
    return value ? `${formatNumberWithSpaces(value)} €` : "-";
  };

  const columns = ["", "S2 2022", "S1 2023", "S2 2023", "S1 2024", "S2 2024"];

  return (
    <>
      <div className="fr-container pt-12">
        <h1>Budget</h1>
        <p>
          <strong>Plus fraîche ma ville</strong>
          {" est un service public numérique, c'est pourquoi nous sommes " +
            "transparents sur les ressources allouées et la manière dont elles sont employées."}
        </p>
        <section className="mt-10">
          <h2>Principes</h2>
          <p>
            Nous suivons le{" "}
            <LinkWithoutPrefetch href="https://beta.gouv.fr/approche/manifeste" target="_blank">
              manifeste beta.gouv
            </LinkWithoutPrefetch>{" "}
            dont nous rappelons les principes ici&nbsp;:
          </p>
          <blockquote className="italic">
            <ul className="ml-6 list-inside !list-disc">
              <li>{"Les besoins des utilisateurs sont prioritaires sur les besoins de l'administration"}</li>
              <li>{"Le mode de gestion de l'équipe repose sur la confiance"}</li>
              <li>{"L'équipe adopte une approche itérative et d'amélioration en continu"}</li>
            </ul>
          </blockquote>
        </section>
        <section className="mt-10">
          <h2>Fonctionnement</h2>
          <p>
            {"Plus fraîche ma ville est une start-up d'état : l'équipe est donc portée par un intrapreneur qui est " +
              "responsable du service numérique développé au sein de son administration (l'ADEME en l'occurence)."}
          </p>
          <p>
            {"Son rôle est multiple : déploiement, gestion des produits, référent auprès de son administration " +
              "(budget, compte rendus d'avancement)."}
          </p>
          <p>
            {"Le budget exposé ici ne prend pas en compte l'intrapreneur puisque qu'il est salarié de l'ADEME mais " +
              "concerne les membres de l'équipe."}
          </p>
        </section>
        <section className="mb-20 mt-10">
          <h2>Budget consommé</h2>
          <table className="border-collaps table-auto">
            <thead>
              <tr className="bg-dsfr-background-contrast-blue-france">
                {columns.map((col, index) => (
                  <th key={index} className="px-6 py-3 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.category} className={clsx(row.category === "Total" ? "font-bold" : "")}>
                  <td className={`px-6 py-3 ${row.category === "Total" ? "font-bold" : "font-medium"}`}>
                    {row.category}
                  </td>
                  <td className="px-6 py-3 text-right">{formatBudget(row.S2_2022)}</td>
                  <td className="px-6 py-3 text-right">{formatBudget(row.S1_2023)}</td>
                  <td className="px-6 py-3 text-right">{formatBudget(row.S2_2023)}</td>
                  <td className="px-6 py-3 text-right">{formatBudget(row.S1_2024)}</td>
                  <td className="px-6 py-3 text-right">{formatBudget(row.S2_2024)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
