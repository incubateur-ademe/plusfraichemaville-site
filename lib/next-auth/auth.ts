import { getServerSession, NextAuthOptions, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { PFMV_ROUTES } from "@/helpers/routes";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Ok to ignore : https://github.com/nextauthjs/next-auth/issues/9493
  // @ts-expect-error
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      console.log("session", session);
      console.log("token", token);
      console.log("session.user", session.user);
      // const databaseuser = await prisma.user.findUnique({ where: { email: token.email } });
      // console.log("user in session", databaseuser);
      return { ...session, user: { ...session.user} };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      console.log("token", token);
      console.log("user", user);
      // const dbUser = await prisma.utilisateur.findFirst({ where: { email: token.email } });
      // console.log("dbUser", dbUser);

      return token;
    },
  },
  events: {
    createUser: (message: { user: User }) => {
      console.log("message", message);
      console.log("user", message.user);
      prisma.utilisateur.create({
        data: {
          email: message.user.email,
        },
      });
    },
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
      checks: ["nonce", "state"],
      authorization: {
        params: {
          scope: "openid uid given_name usual_name email",
          acr_values: "eidas1",
          redirect_uri: process.env.NEXT_PUBLIC_URL_SITE + "/api/auth/callback/agentconnect",
          nonce: uuidv4(),
          state: uuidv4(),
        },
      },
      idToken: true,
      clientId: process.env.AGENT_CONNECT_ID,
      clientSecret: process.env.AGENT_CONNECT_SECRET,
      client: {
        authorization_signed_response_alg: "HS256",
        id_token_signed_response_alg: "HS256",
      },
      profile(profile) {
        // return profile;
        console.log("profile", profile)
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
