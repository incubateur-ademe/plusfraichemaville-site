import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { HomepageNewsletter } from "@/src/components/homepage/homepage-newsletter";
import { getAllWebinaires } from "@/src/lib/strapi/queries/webinaires-queries";
import CustomTabButton from "@/src/components/common/CustomTabButton";
import { WebinairesList } from "@/src/components/webinaires/webinaires-list";

export const metadata: Metadata = computeMetadata("Webinaires");

export default async function PageWebinaires() {
  const allWebinaires = await getAllWebinaires();
  const futureWebinaires = allWebinaires.filter(
    (webinaire) => webinaire.attributes.jour_evenement && new Date(webinaire.attributes.jour_evenement) > new Date(),
  );
  const pastWebinaires = allWebinaires.filter(
    (webinaire) =>
      webinaire.attributes.jour_evenement &&
      webinaire.attributes.lien_replay &&
      new Date(webinaire.attributes.jour_evenement) <= new Date(),
  );
  return (
    <div className="pb-8">
      <div className="fr-container">
        <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Webinaires</h1>
        <div className="fr-tabs before:!shadow-none">
          <ul className="fr-tabs__list !p-0" role="tablist" aria-label="Webinaires">
            <li role="presentation">
              <CustomTabButton
                label={`Webinaires à venir (${futureWebinaires.length ?? 0})`}
                isSelected
                contentId="tabpanel-webinaires-a-venir"
                className="simpleTab w-52"
              />
            </li>
            <li role="presentation">
              <CustomTabButton
                label={`Webinaires à revoir (${pastWebinaires.length ?? 0})`}
                isSelected={false}
                contentId="tabpanel-webinaires-a-revoir"
                className="simpleTab w-52"
              />
            </li>
          </ul>
          <WebinairesList
            webinaires={futureWebinaires}
            id="tabpanel-webinaires-a-venir"
            emptyListPlaceholder="Il n'y a pas de webinaire à venir,
            inscrivez-vous à notre newsletter pour être informé(e) des prochaines dates."
          />
          <WebinairesList
            webinaires={pastWebinaires}
            id="tabpanel-webinaires-a-revoir"
            emptyListPlaceholder="Il n'y a pas de webinaire à revoir."
          />
        </div>
      </div>
      <HomepageNewsletter />
    </div>
  );
}
