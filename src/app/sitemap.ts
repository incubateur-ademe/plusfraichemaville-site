import { MetadataRoute } from "next";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { getRetoursExperiencesDiag } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_SITE ?? "";
  const staticPages = ["accessibilite", "budget", "contact", "mentions-legales", "stats", "connexion", "actualites"];
  const importantPages = [
    "",
    PFMV_ROUTES.AIDE_DECISION,
    PFMV_ROUTES.FICHES_SOLUTIONS,
    PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
    PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC,
    PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION,
    PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE,
    PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING,
  ];
  const allFichesSolutions = await getAllFichesSolutions();
  const allRetourExperiences = await getRetoursExperiences();
  const allFichesDiagnostic = await getAllFichesDiagnostic();
  const allRetourExperiencesDiag = await getRetoursExperiencesDiag();

  const staticUrls = staticPages.map((page) => ({
    url: getFullUrl(page),
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const importantUrls = importantPages.map((page) => ({
    url: getFullUrl(page),
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 1.0,
  }));

  const ficheSolutionPages = allFichesSolutions.map((page) => ({
    url: `${baseUrl}/fiche-solution/${page.attributes.slug}`,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const retourExperiencePages = allRetourExperiences.map((page) => ({
    url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(page.attributes.slug)),
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const ficheDiagnosticPages = allFichesDiagnostic.map((page) => ({
    url: getFullUrl(PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(page.attributes.slug)),
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const rexDiagPages = allRetourExperiencesDiag.map((page) => ({
    url: getFullUrl(PFMV_ROUTES.RETOUR_EXPERIENCE_DIAGNOSTIC(page.attributes.slug)),
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    ...importantUrls,
    ...staticUrls,
    ...ficheSolutionPages,
    ...retourExperiencePages,
    ...ficheDiagnosticPages,
    ...rexDiagPages,
  ];
}
