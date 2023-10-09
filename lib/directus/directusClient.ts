import { createDirectus, staticToken } from "@directus/sdk";
import { rest } from "@directus/sdk/rest";
import { CustomDirectusTypes } from "@/lib/directus/directusModels";

const DIRECTUS_URL = process.env.DIRECTUS_URL || "";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || "";
export const DIRECTUS_ASSET_URL = DIRECTUS_URL + "/assets/";

// Client with REST support
export const directusClient = createDirectus<CustomDirectusTypes>(DIRECTUS_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_TOKEN));
