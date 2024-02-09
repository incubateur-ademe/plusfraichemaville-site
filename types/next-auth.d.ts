import { Prisma } from "@prisma/client";

type AuthUser = {
  id: string;
  email: string;
  utilisateur: Prisma.utilisateur;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: AuthUser;
  }
}
