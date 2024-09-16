import { User } from "@prisma/client";

export const DisplayUserName = ({ user }: { user?: User }) =>
  user && (
    <span className="capitalize">
      {" "}
      {user.prenom} {user.nom}
    </span>
  );
