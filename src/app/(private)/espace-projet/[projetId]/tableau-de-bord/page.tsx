import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import TableauDeBordPageClient from "./TableauDeBordPageClient";

export const metadata: Metadata = computeMetadata("Tableau de bord");

export default function TableauDeBordPage() {
  return <TableauDeBordPageClient />;
}
