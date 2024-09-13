import { ProtectedEspaceProjetUrl } from "@/components/common/protected-espace-projet-url";
import { AideEdit } from "@/components/financement/aide/aide-edit";

export default function AideEditPage() {
  return (
    <ProtectedEspaceProjetUrl>
      <div>
        <AideEdit />
      </div>
    </ProtectedEspaceProjetUrl>
  );
}
