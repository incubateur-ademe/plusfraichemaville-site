"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <Button className="rounded-3xl" type="button" onClick={() => onLogout()}>
      Se déconnecter
    </Button>
  );
};

export default SignoutButton;
