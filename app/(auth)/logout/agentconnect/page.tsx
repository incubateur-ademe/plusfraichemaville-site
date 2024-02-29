import { auth } from "@/lib/next-auth/auth";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";

export default async function Logout() {
  const session = await auth();
  const logOutUrl = new URL(`${process.env.AGENT_CONNECT_BASE_URL}/v2/session/end`);
  logOutUrl.searchParams.set("id_token_hint", session?.id_token || "");
  logOutUrl.searchParams.set("post_logout_redirect_uri", process.env.NEXTAUTH_URL + PFMV_ROUTES.DECONNEXION);
  logOutUrl.searchParams.set("state", uuidv4());
  redirect(logOutUrl.toString());
}
