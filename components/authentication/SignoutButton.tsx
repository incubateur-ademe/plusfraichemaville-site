"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";
import { useRouter } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";

const SignoutButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    router.push(PFMV_ROUTES.DECONNEXION);
  };

  return (
    <Button className="rounded-3xl" type="button" onClick={() => onLogout()}>
      Se déconnecter
    </Button>
  );
};

export default SignoutButton;
