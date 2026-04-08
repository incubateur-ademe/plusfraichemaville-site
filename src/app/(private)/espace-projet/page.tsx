import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { Metadata } from "next";
import ListProjetsPageClient from "./ListProjetsPageClient";

export const metadata: Metadata = computeMetadata("Mes projets");

export default async function ListProjetsPage() {
  return <ListProjetsPageClient />;
}
