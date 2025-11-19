import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import IndicateursEnvironnementauxQuestionsPageClient from "./IndicateursEnvironnementauxQuestionsPageClient";

export const metadata: Metadata = computeMetadata("Renseignements sur l'espace à rafraîchir");

export default function IndicateursEnvironnementauxQuestionsPage() {
  return <IndicateursEnvironnementauxQuestionsPageClient />;
}
