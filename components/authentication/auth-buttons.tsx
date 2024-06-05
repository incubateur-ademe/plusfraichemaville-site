import { AuthButtonEspaceProjet } from "./auth-button-espace-projet";
import { AuthButtonUser } from "./auth-button-user";

export const AuthButtons = () => {
  return (
    <div className="hidden items-center gap-4 lg:flex">
      <AuthButtonEspaceProjet /> <AuthButtonUser />
    </div>
  );
};
