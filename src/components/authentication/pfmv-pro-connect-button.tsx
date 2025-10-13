"use client";
import ProConnectButton from "@codegouvfr/react-dsfr/ProConnectButton";
import { signIn } from "next-auth/react";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import styles from "./page.module.css";
import Button from "@codegouvfr/react-dsfr/Button";

export default function PfmvProConnectButton() {
  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET) });
  return <ProConnectButton className={styles.pfmvProConnectButton}  onClick={handleSignIn} />;
  // return (
  //   <Button
  //     onClick={() => handleSignIn()}
  //     priority="secondary"
  //     iconId="fr-icon-user-line"
  //     iconPosition="left"
  //     className="rounded-3xl"
  //   >
  //     Se connecter
  //   </Button>
  // );
}
