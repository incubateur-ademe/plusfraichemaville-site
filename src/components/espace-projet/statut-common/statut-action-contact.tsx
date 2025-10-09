import { ContactForm } from "@/src/forms/contact/contact-form";

export const StatutActionContact = () => {
  return (
    <div className="w-full rounded-2xl bg-dsfr-background-default-grey-hover p-8">
      <h3 className="fr-h2">
        Vous avez des remarques, des suggestions ? <br />
        Écrivez-nous !
      </h3>
      <p>Notre équipe vous répondra dans les plus brefs délais. À vous de jouer.</p>
      <ContactForm whiteBackground />
    </div>
  );
};
