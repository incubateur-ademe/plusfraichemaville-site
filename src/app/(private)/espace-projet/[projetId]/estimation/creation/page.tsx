import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import CreateEstimationPageClient from "./CreateEstimationPageClient";

export const metadata: Metadata = computeMetadata("Création d'estimation");

export default function CreateEstimationPage() {
  return <CreateEstimationPageClient />;
}
