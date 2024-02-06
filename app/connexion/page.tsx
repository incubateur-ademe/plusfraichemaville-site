"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import SignInCard from "@/components/signin/SignInCard";

export default function EspaceProjet() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/api/auth/callback";
  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h3 mb-12">Espace projet</h1>
      <SignInCard callbackUrl={callbackUrl} />
    </div>
  );
}
