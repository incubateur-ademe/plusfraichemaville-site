import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import styles from "./page.module.css";
import clsx from "clsx";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import { getRetoursExperiencesDiag } from "@/src/lib/strapi/queries/retour-experience-diag-queries";

export default async function SitemapPage() {
  const allFichesSolutions = await getAllFichesSolutions();
  const allRetourExperiences = await getRetoursExperiences();
  const allFichesDiagnostic = await getAllFichesDiagnostic();
  const allRetourExperiencesDiag = await getRetoursExperiencesDiag();

  return (
    <>
      <div className={clsx("fr-container pb-8", styles.containerStyle)}>
        <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Plan du site</h1>
        <section className="mt-10">
          <ul>
            <li>
              <LinkWithoutPrefetch href="/">Accueil</LinkWithoutPrefetch>
              <ul>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.AIDE_DECISION}>Aide à la décision</LinkWithoutPrefetch>
                </li>
                <li>
                  Surchauffe urbaine
                  <ul>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION}>
                        La ville dans une France à +4°C
                      </LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE}>
                        Comprendre les notions clés de la surchauffe urbaine
                      </LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE}>
                        Connaître la sensibilité actuelle et future de ma ville à la surchauffe urbaine
                      </LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING}>
                        Pourquoi et quand faire un diagnostic ?
                      </LinkWithoutPrefetch>
                    </li>
                  </ul>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.FICHES_SOLUTIONS}>Fiches solutions</LinkWithoutPrefetch>
                  <ul>
                    {allFichesSolutions.map((ficheSolution) => (
                      <li key={ficheSolution.id}>
                        <LinkWithoutPrefetch href={PFMV_ROUTES.FICHE_SOLUTION(ficheSolution.attributes.slug)}>
                          {ficheSolution.attributes.titre}
                        </LinkWithoutPrefetch>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET}>
                    Projets réalisés par les collectivités
                  </LinkWithoutPrefetch>
                  <ul>
                    {allRetourExperiences.map((retourExperience) => (
                      <li key={retourExperience.id}>
                        <LinkWithoutPrefetch
                          href={PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(retourExperience.attributes.slug)}
                        >
                          {retourExperience.attributes.titre}
                        </LinkWithoutPrefetch>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  Méthodes de diagnostic
                  <ul>
                    {allFichesDiagnostic.map((ficheDiagnostic) => (
                      <li key={ficheDiagnostic.id}>
                        <LinkWithoutPrefetch
                          href={PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(ficheDiagnostic.attributes.slug)}
                        >
                          {ficheDiagnostic.attributes.titre}
                        </LinkWithoutPrefetch>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC}>
                    Diagnostics réalisés par les collectivités
                  </LinkWithoutPrefetch>
                  <ul>
                    {allRetourExperiencesDiag.map((retourExperienceDiag) => (
                      <li key={retourExperienceDiag.id}>
                        <LinkWithoutPrefetch
                          href={PFMV_ROUTES.RETOUR_EXPERIENCE_DIAGNOSTIC(retourExperienceDiag.attributes.slug)}
                        >
                          {retourExperienceDiag.attributes.titre}
                        </LinkWithoutPrefetch>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.ESPACE_PROJET}>Espace projet</LinkWithoutPrefetch>
                </li>
                <li>
                  A propos du site
                  <ul>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.MENTIONS_LEGALES}>Mentions légales</LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.POLITIQUE_CONFIDENTIALITE}>
                        Politique de confidentialité
                      </LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.ACCESSIBILITE}>
                        {"Déclaration d'accessibilité"}
                      </LinkWithoutPrefetch>
                    </li>
                    <li>
                      <LinkWithoutPrefetch href={PFMV_ROUTES.STATISTIQUES}>{"Statistiques"}</LinkWithoutPrefetch>
                    </li>
                  </ul>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.WEBINAIRES}>Webinaires</LinkWithoutPrefetch>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.CONTACT}>Nous contacter</LinkWithoutPrefetch>
                </li>
                <li>
                  <LinkWithoutPrefetch href={PFMV_ROUTES.CONNEXION}>
                    {"Se connecter à l'espace projet"}
                  </LinkWithoutPrefetch>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
