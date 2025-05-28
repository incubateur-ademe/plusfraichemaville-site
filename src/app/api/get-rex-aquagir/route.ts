import { NextResponse } from "next/server";
import { getAquagirRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import join from "lodash/join";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";
import { getStrapiImageUrl } from "@/src/lib/strapi/strapiClient";
import { captureError } from "@/src/lib/sentry/sentryCustomMessage";

type AquagirRetourExperience = {
  id: number;
  titre: string;
  description: string;
  contenu: string;
  url: string;
  codeInsee: string;
  datePublication?: Date;
  image: string;
};

const rexToAquagirRex = (rex: RetourExperience): AquagirRetourExperience => ({
  id: rex.id,
  titre: rex.attributes.titre,
  description: rex.attributes.description,
  contenu: join(
    [
      rex.attributes.titre,
      rex.attributes.citations.map((citation) => `${citation.auteur}  ${citation.texte}`).join(" "),
      rex.attributes.description,
      rex.attributes.solution_retour_experiences?.data
        .map((sol) => ` ${sol.attributes.titre} ${sol.attributes.description} `)
        .join(" "),
      rex.attributes.situation_avant?.description,
      rex.attributes.situation_apres?.description,
      rex.attributes.partenaires,
      rex.attributes.credits,
    ],
    " ",
  ),
  url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(rex.attributes.slug)),
  codeInsee: (rex.attributes.location as GeoJsonAdresse).properties.citycode,
  datePublication: rex.attributes.publishedAt,
  image: getStrapiImageUrl(rex.attributes.image_principale, "medium"),
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
