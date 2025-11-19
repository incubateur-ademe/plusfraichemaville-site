import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LogoutClient from "./LogoutClient";

export const metadata: Metadata = computeMetadata("Déconnexion");

export default function LogoutPage() {
  return <LogoutClient />;
}
