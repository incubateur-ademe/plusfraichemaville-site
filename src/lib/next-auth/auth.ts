import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "@/src/lib/prisma/prismaClient";
import { fetchEntrepriseFromSirenApi } from "@/src/lib/siren/fetch";
import { getOrCreateCollectivite } from "@/src/lib/prisma/prismaCollectiviteQueries";
import { attachUserToCollectivite } from "@/src/lib/prisma/prismaUserCollectiviteQueries";
import { getUserById, updateUserEtablissementInfo } from "@/src/lib/prisma/prismaUserQueries";
import { AgentConnectInfo } from "@/src/lib/prisma/prismaCustomTypes";
import { fetchCommuneFromBanApi } from "@/src/lib/adresseApi/fetch";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { attachInvitationsByEmail } from "@/src/lib/prisma/prisma-user-projet-queries";
import { EmailService } from "@/src/services/brevo";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  events: {
    createUser: async ({ user }) => {
      const prismaUser = await getUserById(user.id);
      let collectivite = null;
      if (prismaUser) {
        const agentConnectInfo = prismaUser.agentconnect_info as AgentConnectInfo;
        const siret = agentConnectInfo.siret;
        if (siret) {
          const entityFromSiren = await fetchEntrepriseFromSirenApi(siret);
          const codeInsee = entityFromSiren?.etablissement?.adresseEtablissement.codeCommuneEtablissement;
          const codePostal = entityFromSiren?.etablissement?.adresseEtablissement.codePostalEtablissement;
          if (entityFromSiren?.etablissement) {
            await updateUserEtablissementInfo(
              user.id,
              entityFromSiren.etablissement?.uniteLegale?.denominationUniteLegale,
              entityFromSiren.etablissement,
            );
          }
          if (codePostal && codeInsee) {
            const entitiesFromBan = await fetchCommuneFromBanApi(codePostal);
            const collectiviteToUse = entitiesFromBan.find(
              (address) => address.codeInsee === codeInsee && address.codePostal === codePostal,
            );
            if (collectiviteToUse) {
              collectivite = await getOrCreateCollectivite(collectiviteToUse, prismaUser.id);
              await attachUserToCollectivite(prismaUser, collectivite, true);
            }
          }
        }
        await attachInvitationsByEmail(prismaUser.email, user.id);
        const emailService = new EmailService();
        await emailService.sendWelcomeMessageEmail({
          nomCollectivite: collectivite?.nom,
          email: prismaUser.email,
          nom: prismaUser.nom ?? "",
        });
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: PFMV_ROUTES.CONNEXION,
  },
  callbacks: {
    async jwt({ token, account, user }) {
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
            customCaptureException("Error while getting info from AgentConnect", err);
            throw new Error(err);
          }
        },
      },
      profile: async (profile) => {
        return {
          id: profile.email,
          prenom: profile.given_name,
          nom: profile.usual_name,
          email: profile.email,
          poste: profile.belonging_population,
          agentconnect_info: profile,
        };
      },
    },
  ],
};

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
