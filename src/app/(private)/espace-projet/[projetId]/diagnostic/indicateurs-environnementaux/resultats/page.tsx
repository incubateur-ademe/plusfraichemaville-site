import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import IndicateursEnvironnementauxResultatsPageClient from "./IndicateursEnvironnementauxResultatsPageClient";

export const metadata: Metadata = computeMetadata("Résulat du diagnostic simplifié");

export default function IndicateursEnvironnementauxResultatsPage() {
  return <IndicateursEnvironnementauxResultatsPageClient />;
}
