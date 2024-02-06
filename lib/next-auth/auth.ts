import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
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
          redirect_uri: "http://test.localhost:3000/api/auth/callback/agentconnect",
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
          image: profile.picture,
        };
      },
    },
  ],
};
