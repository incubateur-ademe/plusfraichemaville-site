"use client";

import Button from "@codegouvfr/react-dsfr/Button";

import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";

const SignoutButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    router.push(PFMV_ROUTES.DECONNEXION);
  };

  return (
    <Button type="button" onClick={() => onLogout()}>
      Se déconnecter
    </Button>
  );
};

export default SignoutButton;
