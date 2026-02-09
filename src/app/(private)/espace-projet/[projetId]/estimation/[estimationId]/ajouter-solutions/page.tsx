import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import AddSolutionsPageClient from "./AddSolutionsPageClient";

export const metadata: Metadata = computeMetadata("Ajouter des solutions");

export default function AddSolutionsPage() {
  return <AddSolutionsPageClient />;
}
