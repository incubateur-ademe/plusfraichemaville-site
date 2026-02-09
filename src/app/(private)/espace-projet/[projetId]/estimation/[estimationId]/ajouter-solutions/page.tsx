import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import AddFichesSolutionEstimationPage from "./add-fiches-solution-estimation-page";

export const metadata: Metadata = computeMetadata("Ajouter des solutions");

export default function AddSolutionsPage() {
  return <AddFichesSolutionEstimationPage />;
}
