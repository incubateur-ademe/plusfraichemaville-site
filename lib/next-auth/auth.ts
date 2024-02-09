import { getServerSession, NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { PFMV_ROUTES } from "@/helpers/routes";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Ok to ignore : https://github.com/nextauthjs/next-auth/issues/9493
  // @ts-expect-error
  adapter: PrismaAdapter(prisma),
  
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  pages: {
    signIn: PFMV_ROUTES.CONNEXION,
  },
  providers: [
    {
      id: "agentconnect",
      name: "Agent Connect",
      type: "oauth",
      wellKnown: process.env.AGENT_CONNECT_WELLKNOWN_URL,
      authorization: {
        params: {
          scope: "openid",
          acr_values: "eidas1",
          redirect_uri: process.env.NEXT_PUBLIC_URL_SITE + "/api/auth/callback/agentconnect",
          nonce: "1234564",
        },
      },
      idToken: true,
      clientId: process.env.AGENT_CONNECT_ID,
      clientSecret: process.env.AGENT_CONNECT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
};

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
