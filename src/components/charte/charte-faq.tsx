import Accordion from "@codegouvfr/react-dsfr/Accordion";

const faqCharte = [
  {
    slug: "signature-obligatoire-espace-projet",
    question: "Dois-je signer la charte pour utiliser l'espace projet de Plus fraîche ma ville ?",
    reponse: (
      <p>
        Non. L'espace projet est ouvert à toutes les collectivités, signataires ou non. Vous pouvez dès à présent vous
        connecter avec votre adresse professionnelle et créer votre projet.
      </p>
    ),
  },
  {
    slug: "duree-engagement",
    question: "Combien de temps dure l'engagement ?",
    reponse: <p>La charte ne fixe pas de durée : elle accompagne la démarche de votre collectivité dans le temps.</p>,
  },
  {
    slug: "acces-financements",
    question: "La charte donne-t-elle accès à des financements ?",
    reponse: (
      <p>
        La charte n'ouvre pas de financement. Néanmoins, vous trouverez dans l'espace projet de Plus fraîche ma ville
        les aides financières mobilisables pour vos projets.
      </p>
    ),
  },
  {
    slug: "signature-projet-existant",
    question: "Puis-je signer la charte si j'ai déjà créé mon projet dans Plus fraîche ma ville ?",
    reponse: (
      <p>
        Bien sûr ! La charte est ouverte à toutes les collectivités, quel que soit l'avancement de leurs projets. Si
        vous en avez déjà un en cours, la signature l'inscrit dans une démarche de long terme, et votre expérience
        pourra inspirer d'autres collectivités.
      </p>
    ),
  },
];

export const CharteFAQ = () => (
  <section className="fr-my-7w fr-container">
    <h2 className="fr-h2">Questions fréquentes</h2>
    <div className="fr-accordions-group">
      {faqCharte.map((faqItem) => (
        <Accordion label={faqItem.question} key={faqItem.slug}>
          {faqItem.reponse}
        </Accordion>
      ))}
    </div>
  </section>
);
