import React from "react";
import { auth } from "@/lib/next-auth/auth";
import SignoutButton from "@/components/authentication/SignoutButton";

export default async function EspaceProjet() {
  const session = await auth();
  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h3 mb-12">Espace projet</h1>
      <div>{"Bienvenue dans l'espace projet !"}</div>
      <div>Vous êtes connecté avec le mail : {session?.user?.email}</div>
      <SignoutButton />
    </div>
  );
}
