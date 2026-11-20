import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import { chartePourquoiSignerData } from "@/src/app/(site-vitrine)/charte-d-engagement-pour-le-rafraichissement-urbain/charte-pourquoi-signer-data";
import Image from "next/image";
import { getAllChartes } from "@/src/lib/strapi/queries/chartes-queries";
import { getRegionCodeFromDepartementCode } from "@/src/helpers/departements-regions";
import clsx from "clsx";

export const metadata: Metadata = computeMetadata("Charte d'engagement pour le rafraîchissement urbain");

export default async function CharteEngagementIntroPage() {
  const chartes = await getAllChartes();
  const nombreCollectivitesSignataires = chartes.length;
  const nombreRegionsRepresentees = new Set(
    chartes.map((charte) => getRegionCodeFromDepartementCode(charte.departement.code)).filter(Boolean),
  ).size;

  return (
    <>
      <div className="fr-container">
        <h1 className="mb-12 mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Charte d'engagement pour le rafraîchissement urbain
        </h1>
        <section className="fr-text--lg fr-mb-7w bg-dsfr-background-alt-blue-france ">
          <div className="ml-12 flex flex-row gap-12">
            <div>
              <p className="mb-12 mt-12">
                Engagez votre collectivité pour lutter durablement contre la surchauffe urbaine, aux côtés de l'ADEME
                avec Plus fraîche ma ville.
              </p>
              <div className="flex flex-row flex-wrap gap-12">
                <LinkWithoutPrefetch href={PFMV_ROUTES.CONTACT} className="fr-btn">
                  Je souhaite signer la charte
                </LinkWithoutPrefetch>
                <div>
                  <LinkWithoutPrefetch
                    className="fr-link fr-link--download"
                    download
                    href="https://cdn.plusfraichemaville.fr/Guide_diagnostic_Surchauffe_Urbaine_202406.pdf"
                  >
                    Lire la charte
                    <span className="fr-link__detail">PDF – 0.7 Mo</span>
                  </LinkWithoutPrefetch>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-14 gap-y-6 px-10 py-8">
                <div>
                  <div className="text-5xl font-extrabold text-dsfr-text-label-blue-france">
                    {nombreCollectivitesSignataires}
                  </div>
                  <div>collectivités signataires</div>
                </div>
                <div>
                  <div className="text-5xl font-extrabold text-dsfr-text-label-blue-france">
                    {nombreRegionsRepresentees}
                  </div>
                  <div>régions représentées</div>
                </div>
              </div>
            </div>
            <Image src="/images/charte/header-page-charte-pfmv.jpg" alt="" width="400" height="300" />
          </div>
        </section>
        <section className="fr-text--lg fr-mb-7w ">
          <h2>Qu'est ce que la charte ?</h2>
          <p>
            La charte d'engagement pour le rafraîchissement urbain est un acte signé entre une collectivité et l'ADEME,
            pour agir contre la surchauffe urbaine. Par cette signature, une commune ou une intercommunalité, quelle que
            soit sa taille, s'engage dans une démarche de rafraîchissement urbain, pour mener des projets efficaces et
            durables, et partager son expérience avec d'autres collectivités avec l'appui du service numérique Plus
            fraîche ma ville de l'ADEME.
          </p>
        </section>
        <section className="fr-text--lg">
          <h2>Pourquoi signer ?</h2>
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
            {chartePourquoiSignerData.blocs.map((bloc, index) => (
              <div
                className="flex flex-col gap-3 bg-dsfr-background-alt-blue-france p-6 md:flex-row md:gap-6"
                key={index}
              >
                <i className={clsx("fr-icon--lg mr-2 !text-pfmv-navy", bloc.className)} aria-hidden="true"/>
                <div className="items-center">
                  <div className="fr-h5 !mb-2 text-pfmv-navy">{bloc.title}</div>
                  <div className="fr-text--xl">{bloc.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
