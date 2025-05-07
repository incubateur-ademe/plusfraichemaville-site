import { MetadataRoute } from "next";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { getRetoursExperiencesDiag } from "@/src/lib/strapi/queries/retour-experience-diag-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_SITE ?? "";
  const staticPages = ["accessibilite", "budget", "contact", "mentions-legales", "stats", "connexion", "webinaires"];
  const importantPages = [
    "",
    "aide-decision",
    "fiches-diagnostic",
    "fiche-solution",
    "projet",
    "surchauffe-urbaine",
    "surchauffe-urbaine/notions-cles",
    "surchauffe-urbaine/quand-faire-un-diagnostic",
    "surchauffe-urbaine/retour-experience",
  ];
  const allFichesSolutions = await getAllFichesSolutions();
  const allRetourExperiences = await getRetoursExperiences();
  const allFichesDiagnostic = await getAllFichesDiagnostic();
  const allRetourExperiencesDiag = await getRetoursExperiencesDiag();

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const importantUrls = importantPages.map((page) => ({
    url: `${baseUrl}/${page}`,
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
    url: `${baseUrl}/projet/${page.attributes.slug}`,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const ficheDiagnosticPages = allFichesDiagnostic.map((page) => ({
    url: `${baseUrl}/surchauffe-urbaine/fiche-diagnostic/${page.attributes.slug}`,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const rexDiagPages = allRetourExperiencesDiag.map((page) => ({
    url: `${baseUrl}/surchauffe-urbaine/retour-experience/${page.attributes.slug}`,
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
