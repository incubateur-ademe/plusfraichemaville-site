import { UserDto } from "@/src/types/dto";

export const DisplayUserName = ({ user }: { user?: UserDto }) =>
  user && (
    <span className="capitalize">
      {" "}
      {user.prenom} {user.nom}
    </span>
  );
