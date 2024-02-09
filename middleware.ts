import { PFMV_ROUTES } from "@/helpers/routes";

export { default } from "next-auth/middleware";

export const config = { matcher: [PFMV_ROUTES.ESPACE_PROJET + "/:path*"] };
