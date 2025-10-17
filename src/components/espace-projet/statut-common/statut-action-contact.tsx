import { ContactIframe } from "@/src/forms/contact/contact-iframe";

export const StatutActionContact = () => {
  return (
    <div className="w-full rounded-2xl bg-dsfr-background-default-grey-hover p-8">
      <h3 className="fr-h2">
        Vous avez des remarques, des suggestions ? <br />
        Écrivez-nous !
      </h3>
      <p>Notre équipe vous répondra dans les plus brefs délais. À vous de jouer.</p>
      <section className="rounded-2xl bg-white  pt-4">
        <ContactIframe className="!h-[79rem] md:!h-[70rem]" />
      </section>
    </div>
  );
};
