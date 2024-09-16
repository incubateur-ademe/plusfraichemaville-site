import { ProtectedEspaceProjetUrl } from "@/src/components/common/protected-espace-projet-url";
import { AideEdit } from "@/src/components/financement/aide/aide-edit";

export default function AideEditPage() {
  return (
    <ProtectedEspaceProjetUrl>
      <div>
        <AideEdit />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
