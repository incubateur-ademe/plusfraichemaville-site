import { AideProjetEdit } from "@/src/components/financement/aide/aide-projet-edit";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Sélectionner des aides");

export default function SelectionnerAidesPage() {
  return <AideProjetEdit />;
}
