import { NextResponse } from "next/server";
import { getAquagirRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import join from "lodash/join";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { getStrapiImageUrl } from "@/src/lib/strapi/strapiClient";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

type AquagirRetourExperience = {
  id: string;
  titre: string;
  description: string;
  contenu: string;
  url: string;
  codeInsee: string;
  datePublication?: Date;
  image: string;
};

const rexToAquagirRex = (rex: RetourExperience): AquagirRetourExperience => ({
  id: rex.documentId,
  titre: rex.titre,
  description: rex.description,
  contenu: join(
    [
      rex.titre,
      rex.citations.map((citation) => `${citation.auteur}  ${citation.texte}`).join(" "),
      rex.description,
      rex.solution_retour_experiences?.map((sol) => ` ${sol.titre} ${sol.description} `).join(" "),
      rex.situation_avant?.description,
      rex.situation_apres?.description,
      rex.partenaires,
      rex.credits,
    ],
    " ",
  ),
  url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(rex.slug)),
  codeInsee: (rex.location as GeoJsonAdresse).properties.citycode,
  datePublication: rex.publishedAt,
  image: getStrapiImageUrl(rex.image_principale, "medium"),
});

export async function GET() {
  const response = await getAquagirRetoursExperiences();
  console.log("Appel de l'API Aquagir");
  if (response) {
    return NextResponse.json(response.map(rexToAquagirRex));
  }
  captureError("Erreur lors de l'appel à l'API Aquagir");
  return NextResponse.json(null);
}
