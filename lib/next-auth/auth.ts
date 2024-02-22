import { getServerSession, NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { PFMV_ROUTES } from "@/helpers/routes";
import { v4 as uuidv4 } from "uuid";
import * as Sentry from "@sentry/nextjs";
import { prismaClient } from "@/lib/prisma/prismaClient";

export const authOptions: NextAuthOptions = {
  // Ok to ignore : https://github.com/nextauthjs/next-auth/issues/9493
  // @ts-expect-error
  adapter: PrismaAdapter(prismaClient),

  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  pages: {
    signIn: PFMV_ROUTES.CONNEXION,
  },
  callbacks: {
    async jwt({ token, account , user}) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.user_id;
      return { ...session, id_token: token.id_token, provider: token.provider, user_id: token.user_id };
    },
  },
  providers: [
    {
      id: "agentconnect",
      name: "Agent Connect",
      type: "oauth",
      idToken: true,
      clientId: process.env.AGENT_CONNECT_ID,
      clientSecret: process.env.AGENT_CONNECT_SECRET,
      wellKnown: process.env.AGENT_CONNECT_BASE_URL + "/v2/.well-known/openid-configuration",
      allowDangerousEmailAccountLinking: true,
      checks: ["nonce", "state"],
      authorization: {
        params: {
          scope: "openid uid given_name usual_name email siret",
          acr_values: "eidas1",
          redirect_uri: process.env.NEXT_PUBLIC_URL_SITE + "/api/auth/callback/agentconnect",
          nonce: uuidv4(),
          state: uuidv4(),
        },
      },
      client: {
        authorization_signed_response_alg: "HS256",
        id_token_signed_response_alg: "HS256",
        userinfo_encrypted_response_alg: "HS256",
        userinfo_signed_response_alg: "HS256",
        userinfo_encrypted_response_enc: "HS256",
      },
      userinfo: {
        async request(context) {
          try {
            const userInfo = await fetch(process.env.AGENT_CONNECT_BASE_URL + "/v2/userinfo", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
            }).then((res) => {
              return res.text();
            });
            return JSON.parse(Buffer.from(userInfo.split(".")[1], "base64").toString());
          } catch (err: any) {
            console.log("Error while getting info from AgentConnect", err);
            Sentry.captureException(err);
            throw new Error(err);
          }
        },
      },
      profile: async (profile) => {
        return {
          id: profile.sub,
          prenom: profile.given_name,
          nom: profile.usual_name,
          email: profile.email,
          poste: profile.belonging_population,
          agentconnect_info: profile,
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
