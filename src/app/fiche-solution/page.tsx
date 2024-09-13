import { FichesSolutions } from "@/components/ficheSolution/fiches-solutions";
import { Metadata } from "next";
import { computeMetadata } from "@/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Passez à l’action");

export default async function FichesSolutionsPage({
  searchParams,
}: {
  searchParams: {
    espaceFilter: string | undefined;
    typeSolutionFilter: string | undefined;
    baisseTemperatureFilter: string | undefined;
  };
}) {
  return <FichesSolutions searchParams={searchParams} />;
}
