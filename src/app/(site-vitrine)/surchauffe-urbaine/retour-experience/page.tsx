import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Exemples de diagnostic réalisé par les collectivités");

export default async function SurchauffeUrbaineRetourExperiencePage() {
  return <div>Diagnostics réalisés par les collectivités</div>;
}
