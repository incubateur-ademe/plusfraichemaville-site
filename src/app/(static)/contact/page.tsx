import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { ContactIframe } from "@/src/forms/contact/contact-iframe";

export const metadata: Metadata = computeMetadata("Contactez-nous");

export default async function PageContact() {
  return (
    <div className="fr-container  pb-28 pt-4">
      <div className="w-full rounded-2xl bg-dsfr-background-default-grey-hover p-8">
        <h1 className="fr-h2">
          Vous avez des remarques, des suggestions ? <br />
          Écrivez-nous !
        </h1>
        <p>Notre équipe vous répondra dans les plus brefs délais. À vous de jouer.</p>
        <section className="rounded-2xl bg-white  pt-4">
          <ContactIframe className="!h-[79rem] md:!h-[70rem]" />
        </section>
      </div>
    </div>
  );
}
