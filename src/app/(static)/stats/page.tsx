import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Statistiques");

export default function StatsPage() {
  return (
    <iframe
      title="Statistiques publiques"
      src="https://stats.plusfraichemaville.fr/public/dashboard/91e40bc7-df69-4ed8-8c43-0e5aa320d3f0"
      className="h-[120rem] w-full"
    ></iframe>
  );
}
