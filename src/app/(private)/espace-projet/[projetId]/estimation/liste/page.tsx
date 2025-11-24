import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import ListeEstimationPageClient from "./ListeEstimationPageClient";

export const metadata: Metadata = computeMetadata("Mes estimations");

export default function ListeEstimationPage() {
  return <ListeEstimationPageClient />;
}
