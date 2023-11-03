import { FicheTechnique } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";

export default async function FicheTechniqueFullCard({ ficheTechnique }: { ficheTechnique: FicheTechnique }) {
  return (
    <div
      className="fr-card fr-card--no-border fr-card--shadow fr-enlarge-link
    flex-1 grow border-dsfr-border-grey rounded-2xl"
    >
      <div className="fr-card__body">
        <div className="fr-card__content">
          <div
            className="text-xs fr-text--bold uppercase mb-4 text-dsfr-text-color-green
          fr-icon-leaf-fill fr-link--icon-right"
          >
            Solution verte
          </div>
          <h3 className="fr-card__title">
            <a className="!text-dsfr-text-color-green fr-text--bold" href={`/fiche-technique/${ficheTechnique.slug}`}>
              {ficheTechnique.titre}
            </a>
          </h3>
          <div className="fr-card__desc">
            <div>{ficheTechnique.description_courte}</div>
            <div className="mt-6 mb-2 text-right">
              <div className="fr-text--bold text-4xl text-dsfr-text-color-green">-1,5 °</div>
              <div className="text-xs text-dsfr-text-color-grey">Température locale</div>
            </div>
            <hr className="pb-1" />
            <div className="text-dsfr-text-color-grey">
              <div className="fr-text--bold text-xs text-dsfr-text-color-grey">Rapidité effective</div>
              <div className="inline-block w-full">
                <div className="float-left">
                  <span className={"ri-hourglass-2-fill fr-icon--sm text-dsfr-text-color-green"}></span>
                  <span className={"ri-hourglass-2-fill fr-icon--sm text-dsfr-text-color-grey opacity-50"}></span>
                  <span className={"ri-hourglass-2-fill fr-icon--sm text-dsfr-text-color-grey opacity-50"}></span>
                </div>
                <div className="float-right text-xs mt-1">de 6 mois à un an</div>
              </div>
              <hr className="pb-1" />
              <div className="fr-text--bold text-xs">Pérénnité</div>
              <div className="inline-block w-full">
                <div className="float-left">
                  <span className={"ri-shining-2-fill fr-icon--sm text-dsfr-text-color-green"}></span>
                  <span className={"ri-shining-2-fill fr-icon--sm text-dsfr-text-color-green"}></span>
                  <span className={"ri-shining-2-fill fr-icon--sm text-dsfr-text-color-grey opacity-50"}></span>
                </div>
                <div className="float-right text-xs mt-1">de 6 mois à un an</div>
              </div>
              <hr className="pb-1" />
              <div className="fr-text--bold text-xs">Coût</div>
              <div className="inline-block w-full">
                <div className="float-left">
                  <span className={"fr-icon-money-euro-circle-line fr-icon--sm text-dsfr-text-color-green"}></span>
                  <span className={"fr-icon-money-euro-circle-line fr-icon--sm text-dsfr-text-color-green"}></span>
                  <span
                    className={"fr-icon-money-euro-circle-line fr-icon--sm text-dsfr-text-color-grey opacity-50"}
                  ></span>
                </div>
                <div className="float-right text-xs mt-1">de 3000 € à 10 000 €</div>
              </div>
              <hr className="pb-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="fr-card__header">
        <div className="fr-card__img">
          <Image
            width={600}
            height={300}
            className="w-full h-52 object-cover rounded-t-2xl"
            src={DIRECTUS_ASSET_URL + ficheTechnique.image_principale + "?key=fiche-technique-card"}
            alt={ficheTechnique?.titre || "image titre"}
          />
        </div>
      </div>
    </div>
  );
}
