"use client";

import { useSession } from "next-auth/react";

import { GenericSaveUnauthenticated } from "./generic-save-unauthenticated";

export const GenericSaveFicheButton = () => {
  const isAuthenticated = useSession().status === "authenticated";

  return <div>{!isAuthenticated && <GenericSaveUnauthenticated />}</div>;
};

export const Test = () => {
  return (
    <div className="py-[30vh]">
      <GenericSaveFicheButton />
    </div>
  );
};
