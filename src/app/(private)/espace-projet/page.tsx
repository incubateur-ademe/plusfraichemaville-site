import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import ListProjetsPageClient from "./ListProjetsPageClient";

export const metadata: Metadata = computeMetadata("Mes projets");

export default function ListProjetsPage() {
  return <ListProjetsPageClient />;
}
