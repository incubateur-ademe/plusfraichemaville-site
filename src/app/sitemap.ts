import { MetadataRoute } from "next";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_SITE ?? "";
  const staticPages = ["accessibilite", "budget", "contact", "mentions-legales", "stats", "connexion"];
  const importantPages = ["", "aide-decision", "fiches-diagnostic", "fiche-solution", "projet"];
  const allFichesSolutions = await getAllFichesSolutions();
  const allRetourExperiences = await getRetoursExperiences();

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

  return [...importantUrls, ...staticUrls, ...ficheSolutionPages, ...retourExperiencePages];
}
