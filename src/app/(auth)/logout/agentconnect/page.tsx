import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { Page } from "@/src/types/global";

const Logout = async (props: Page) => {
  const logOutUrl = new URL(`${process.env.AGENT_CONNECT_BASE_URL}/v2/session/end`);
  logOutUrl.searchParams.set("id_token_hint", props.searchParams.id_token_hint || "");
  logOutUrl.searchParams.set("post_logout_redirect_uri", process.env.NEXTAUTH_URL!);
  logOutUrl.searchParams.set("state", uuidv4());
  redirect(logOutUrl.toString());
};

export default Logout;