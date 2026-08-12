import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import {
  FichesSolutionsListePageContent,
  FichesSolutionsListeSearchParams,
} from "@/src/components/espace-projet/recherche-solutions/fiches-solutions-liste-page-content";

export const metadata: Metadata = computeMetadata(
  "Trouvez les solutions les plus adaptées à votre espace à rafraîchir",
);

export default async function FichesSolutionsListeArbrePage(props: {
  searchParams: Promise<FichesSolutionsListeSearchParams>;
}) {
  const searchParams = await props.searchParams;
  return <FichesSolutionsListePageContent searchParams={searchParams} />;
}
