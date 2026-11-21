import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import {
  charteEngagementCollectivite,
  charteInfoData,
} from "@/src/app/(site-vitrine)/charte-d-engagement-pour-le-rafraichissement-urbain/charte-info-data";
import Image from "next/image";
import { getAllChartes } from "@/src/lib/strapi/queries/chartes-queries";
import { getRegionCodeFromDepartementCode } from "@/src/helpers/departements-regions";
import clsx from "clsx";
import { CharteSignatairesSection } from "@/src/components/charte/charte-signataires-section";
import Button from "@codegouvfr/react-dsfr/Button";
import { CharteFAQ } from "@/src/components/charte/charte-faq";

export const metadata: Metadata = computeMetadata("Charte d'engagement pour le rafraîchissement urbain");

export default async function CharteEngagementIntroPage() {
  const chartes = await getAllChartes();
  const nombreCollectivitesSignataires = chartes.length;
  const nombreRegionsRepresentees = new Set(
    chartes.map((charte) => getRegionCodeFromDepartementCode(charte.departement.code)).filter(Boolean),
  ).size;

  return (
    <>
      <div className="fr-container--fluid">
        <h1 className="fr-h1 mx-auto mb-12 mt-8 max-w-xl text-center font-bold text-dsfr-text-title-grey">
          Charte d'engagement pour le rafraîchissement urbain
        </h1>
        <section className="fr-text--lg fr-mb-7w bg-dsfr-background-alt-blue-france ">
          <div className="fr-container mx-auto flex w-full flex-row gap-12">
            <div>
              <p className="mb-12 mt-12">
                Engagez votre collectivité pour lutter durablement contre la surchauffe urbaine, aux côtés de l'ADEME
                avec Plus fraîche ma ville.
              </p>
              <div className="flex flex-row flex-wrap gap-12">
                <LinkWithoutPrefetch href={PFMV_ROUTES.CONTACT} className="fr-btn fr-btn--lg">
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
              <div className="mt-12 flex flex-wrap gap-x-14 gap-y-6  py-8">
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
            <Image
              src="/images/charte/header-page-charte-pfmv.jpg"
              alt=""
              width="400"
              height="300"
              className="hidden lg:flex"
            />
          </div>
        </section>
        <section className="fr-text--lg fr-mb-7w fr-container mx-auto">
          <h2 className="fr-h2">Qu'est ce que la charte ?</h2>
          <p>
            La charte d'engagement pour le rafraîchissement urbain est un acte signé entre une collectivité et l'ADEME,
            pour agir contre la surchauffe urbaine. Par cette signature, une commune ou une intercommunalité, quelle que
            soit sa taille, s'engage dans une démarche de rafraîchissement urbain, pour mener des projets efficaces et
            durables, et partager son expérience avec d'autres collectivités avec l'appui du service numérique Plus
            fraîche ma ville de l'ADEME.
          </p>
        </section>
        <section className="fr-text--lg fr-mb-7w fr-container">
          <h2 className="fr-h2">Pourquoi signer ?</h2>
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
            {charteInfoData.blocs.map((bloc, index) => (
              <div
                className="flex flex-col gap-3 bg-dsfr-background-alt-blue-france p-6 md:flex-row md:gap-6"
                key={index}
              >
                <i className={clsx("fr-icon--lg mr-2 !text-pfmv-navy", bloc.className)} aria-hidden="true" />
                <div className="items-center">
                  <div className="fr-h5 !mb-2 text-pfmv-navy">{bloc.title}</div>
                  <div className="fr-text--xl">{bloc.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="fr-text--lg fr-mb-7w fr-container">
          <h2 className="fr-h2">À quoi s'engage la collectivité ?</h2>
          <p className="mb-6">Par la signature de la charte, la collectivité s'engage à :</p>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {charteEngagementCollectivite.map((engagement) => (
              <div className="min-w-64 flex-1" key={engagement.numero}>
                <div className="mb-4 text-5xl font-extrabold">{engagement.numero}</div>
                <div className="fr-h5 !mb-3">{engagement.titre}</div>
                <p className="!mb-0">{engagement.description}</p>
              </div>
            ))}
          </div>
        </section>
        <CharteSignatairesSection chartes={chartes} />
        <section id="comment-signer" className="fr-mb-7w bg-dsfr-background-alt-blue-france py-8">
          <div className="fr-container">
            <h2 className="fr-h2">Comment signer ?</h2>
            <p className="fr-text--lg">
              Prenez contact avec l'équipe Plus fraîche ma ville : nous vous accompagnons dans toutes les étapes de la
              signature.
            </p>
            <Button
              linkProps={{ href: PFMV_ROUTES.CONTACT, prefetch: false }}
              iconId="ri-arrow-right-line"
              iconPosition="right"
              size="large"
            >
              Contacter l'équipe
            </Button>
          </div>
        </section>
        <CharteFAQ />
      </div>
    </>
  );
}
