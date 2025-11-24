import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { AideEdit } from "@/src/components/financement/aide/aide-edit";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Sélectionnez des aides financières et en ingénerie");
export default function AideEditPage() {
  return (
    <ProtectedEspaceProjetUrl>
      <div>
        <AideEdit />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
