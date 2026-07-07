import { ContactIframe } from "@/src/forms/contact/contact-iframe";

export const BesoinAidePage = () => {
  return (
    <>
      <section className="mt-12">
        <div className="w-full rounded-2xl bg-dsfr-background-default-grey-hover p-8">
          <h1 className="fr-h2">
            Vous avez des remarques, des suggestions ou besoin d'aide ? <br />
            Écrivez-nous !
          </h1>
          <p>Notre équipe vous répondra dans les plus brefs délais. À vous de jouer.</p>
          <section className="rounded-2xl bg-white  pt-4">
            <ContactIframe className="!h-[79rem] md:!h-[70rem]" />
          </section>
        </div>
      </section>
    </>
  );
};
