import React from "react";
import SignInCard from "@/components/signin/SignInCard";
import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";

export default async function Connexion({searchParams}: {searchParams: {callbackUrl: string | undefined}}) {
  const session = await auth();
  if (session) {
    redirect(PFMV_ROUTES.ESPACE_PROJET);
  }
  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h3 mb-12">Espace projet</h1>
      <SignInCard callbackUrl={searchParams.callbackUrl}/>
    </div>
  );
}
