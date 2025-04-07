import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Notions clés de la surchauffe urbaine");

export default async function SurchauffeUrbaineNotionsClesPage() {
  return <div>Notions clés</div>;
}
