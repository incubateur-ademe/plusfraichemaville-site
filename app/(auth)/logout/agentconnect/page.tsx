import { auth } from "@/lib/next-auth/auth";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export default async function Logout() {
  const session = await auth();
  const logOutUrl = new URL(`${process.env.AGENT_CONNECT_BASE_URL}/v2/session/end`);
  logOutUrl.searchParams.set("id_token_hint", session?.id_token || "");
  // TODO : Changer la conf de l'url chez AgentConnect pour mettre directement /logout
  logOutUrl.searchParams.set("post_logout_redirect_uri", process.env.NEXTAUTH_URL + "/api/auth/signout");
  logOutUrl.searchParams.set("state", uuidv4());
  // TODO Si on conserve le login par email, rediriger directement vers /logout
  redirect(logOutUrl.toString());
}