import Link from "next/link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";

export const HomepageFAQ = () => {
  const faqHome = [
    {
      slug: "pfmv",
      question: "Qu’est-ce que Plus fraîche ma ville ?",
      reponse: (
        <>
          <p>
            Plus fraîche ma ville est un service numérique public et gratuit de l’ADEME, créé en 2022, et soutenu par
            l’Association des maires de France (AMF). Il apporte une aide à la décision pour les élus et agents des
            collectivités de toute taille qui souhaitent rafraîchir durablement leur territoire.
          </p>
          <p>
            La plateforme est pensée par et pour les collectivités qui agissent : co-construite au quotidien avec le
            concours d’agents et élus de collectivités, elle leur permet d’accéder en autonomie à des outils d’analyse e
            diagnostic de la surchauffe urbaine, des solutions de rafraîchissement éprouvées et illustrées par des
            retours d’expérience, ainsi qu’à des aides mobilisables.
          </p>
        </>
      ),
    },
    {
      slug: "qui-peut-utiliser-le-service",
      question: "Le service est-il gratuit, et qui peut l’utiliser ?",
      reponse: (
        <p>
          Plus fraîche ma ville est un service 100 % gratuit : toutes les ressources sont en accès libre. Il a été conçu
          pour faciliter la mise en œuvre de projets pérennes et durables par les collectivités territoriales. Il peut
          être utilisé par les agents et élus de collectivités, ainsi que par leurs partenaires, publics et privés.
        </p>
      ),
    },
    {
      slug: "qu-est-ce-que-l-icu",
      question: "Qu’est-ce que l’effet d’îlot de chaleur urbain (ICU) ?",
      reponse: (
        <p>
          L’effet d’îlot de chaleur urbain (ICU) désigne l’écart de température de l’air entre une ville et la campagne
          environnante. Ce phénomène est surtout marqué la nuit : pendant la journée, les bâtiments et les sols minéraux
          (bitume, béton, pierre) absorbent et stockent la chaleur, puis la restituent après le coucher du soleil, ce
          qui empêche la ville de se rafraîchir. Le manque de végétation et d’eau, l’imperméabilisation des sols et la
          chaleur dégagée par les activités humaines (circulation, climatisation, industries) amplifient ce phénomène.
          L’écart de température peut atteindre 2 à 4°C en moyenne, et jusqu’à 6-7°C lors des canicules (Cerema,
          Météo-France). Plus une ville est dense et minérale, plus l’effet d’ICU est prononcé.
        </p>
      ),
    },
    {
      slug: "mon-exposition-icu",
      question: "Ma commune est-elle concernée par l’effet d’îlot de chaleur urbain (ICU) ?",
      reponse: (
        <>
          <p>
            Si votre commune est peu urbanisée, elle n’est pas nécessairement concernée par le phénomène d’îlot de
            chaleur urbain. Cela ne signifie{" "}
            <span className="fr-text--bold">pas pour autant l’absence de problèmes liés à la chaleur.</span> Une place
            très ensoleillée, une cour d’école ou un espace public sans ombre peuvent être inconfortables, même en
            milieu rural. Évaluer le confort thermique permet d'identifier l’inconfort ressenti par les usagers. On
            tient compte des facteurs climatiques tels que le manque d’ombrage, l’humidité, le vent, le rayonnement
            solaire ainsi que les facteurs physiologiques des individus.
          </p>
          <p>
            Plus fraîche ma ville vous aide à évaluer la <span className="fr-text--bold">surchauffe urbaine</span> de
            votre territoire et à identifier les espaces où des actions de rafraîchissement pourraient être utiles. Le
            service intègre des données gratuites : Climadiag Communes de Météo-France et les Zones Climatiques Locales
            du Cerema. Elles donnent un premier aperçu de la sensibilité de votre territoire. L’espace projet propose
            ensuite des méthodes de diagnostic approfondi et le calcul d’un coefficient de rafraîchissement urbain sur
            un espace donné.
          </p>
        </>
      ),
    },
    {
      slug: "solution-lutte-chaleur-en-ville",
      question: "Quelles sont les solutions pour lutter contre la chaleur en ville ?",
      reponse: (
        <>
          <p>
            Pour rafraîchir une ville ou un village, il faut combiner plusieurs types de solutions adaptées au lieu et
            au climat :
          </p>
          <ul className="mb-4 ml-4 list-disc">
            <li>
              les solutions vertes, fondées sur la végétation : planter des arbres pour créer de l’ombre, végétaliser
              les rues, les places, les toits et les façades ;
            </li>
            <li>les solutions bleues, liée à l’eau : fontaines, noues, plans d’eau, gestion des eaux de pluie ;</li>
            <li>
              les solutions grises, liées aux matériaux et à la forme urbaine : revêtements adaptés pour limiter le
              stockage de la chaleur, ombrières, désimperméabilisation des sols ;
            </li>
            <li>
              les solutions douces, liées aux usages : réduction de la circulation automobile, sensibilisation des
              habitants, adaptation des horaires, etc.
            </li>
          </ul>
          <p>
            Plus fraîche ma ville détaille 45 solutions de rafraîchissement éprouvées, à combiner selon le contexte, et
            illustrées par plus de 60 retours d’expérience de collectivités qui les ont déjà mises en œuvre.
          </p>
        </>
      ),
    },
    {
      slug: "aides-financement",
      question: "Quelles aides pour financer un projet de rafraîchissement urbain ?",
      reponse: (
        <>
          <p>
            Vous souhaitez végétaliser une place, désimperméabiliser des sols ou créer des zones de fraîcheur ?
            Plusieurs dispositifs de financement existent pour soutenir votre projet de rafraîchissement urbain : aides
            de l’État, de l’ADEME, des Agences de l’eau, des Régions, des Départements ou encore de certains fonds
            européens tels que le FEDER. Des aides en ingénierie existent aussi pour vous accompagner dans le montage du
            projet.
          </p>
          <p>
            Grâce à une connexion avec le service Aides-territoires de l’ANCT, Plus fraîche ma ville vous aide à
            identifier les aides financières adaptées à votre besoin directement dans votre espace projet.
          </p>
        </>
      ),
    },
    {
      slug: "probleme-proconnect",
      question:
        "Je ne parviens pas à créer mon compte et accéder à l’espace projet car ProConnect" +
        " ne reconnaît pas mon adresse mail. Comment faire ?",
      reponse: (
        <>
          <p>
            Plus fraîche ma ville est accessible pour les agents publics ainsi que les collectivités territoriales et
            leurs partenaires. L’authentification ProConnect, utilisable par tous les{" "}
            <span className="underline">professionnels</span> du public comme du privé, vous permet de ne pas avoir
            besoin de vous créer un nouveau compte.
          </p>
          <ol className="mb-4 ml-4">
            <li>Cliquez sur “Se connecter” en haut à droite de votre écran</li>
            <li>
              Saisissez votre adresse email <span className="fr-text--bold underline">professionnelle</span> : vous
              serez automatiquement redirigé vers votre portail d'identification habituel (ex : Calypsso, Curasso,
              Cerbère, etc.)
            </li>
            <li>Finalisez votre connexion et accédez à votre espace projet Plus fraîche ma ville</li>
          </ol>
          <p className="!mb-2 font-bold">
            Vous êtes agent ou élu dans une commune et vous n’avez pas d’adresse professionnelle (votre adresse est en
            @gmail.com , @sfr.fr, etc.)
          </p>
          <ol className="font-normal">
            <li>Cliquez sur “Se connecter” en haut à droite de votre écran</li>
            <li>Saisissez votre adresse email</li>
            <li>Choisissez un mot de passe</li>
            <li>Un email est envoyé sur votre boîte mail. Pensez à vérifier vos spams et MailinBlack.</li>
            <li>
              Saisissez le SIRET de l’organisation pour laquelle vous travaillez. Vous pouvez le chercher dans
              l’annuaire des entreprises si besoin.
            </li>
            <li>
              Un code, sous la forme d’une série de deux mots, est envoyé par mail est ensuite envoyé à l’adresse
              officielle de votre organisation, renseignée dans{" "}
              <Link href="https://lannuaire.service-public.gouv.fr/" target="_blank">
                l’annuaire du service public
              </Link>
              . Souvent, il s’agit de l’adresse mail de l’accueil : si celle-ci n’est plus à jour, vous pouvez la
              modifier directement dans{" "}
              <Link href="https://lannuaire.service-public.gouv.fr/" target="_blank">
                l’annuaire du service public
              </Link>
              . Pensez à vérifier vos spams et MailinBlack.
            </li>
            <li>
              Finalisez la création de votre compte ProConnect. Il vous servira pour tous les autres sites qui utilisent
              cette méthode d’authentification, et vous n’aurez plus besoin de créer un nouveau compte pour ces
              derniers.
              <br />
              Vous avez maintenant accès à votre espace projet Plus fraîche ma ville.
            </li>
          </ol>
        </>
      ),
    },
  ];
  return (
    <section className="fr-my-7w fr-container">
      <hgroup className="fr-mb-3w">
        <h2 className="!fr-h3 !mb-2">Questions fréquentes sur Plus fraîche ma ville</h2>
      </hgroup>
      <div className="fr-accordions-group">
        {faqHome.map((faqItem) => (
          <Accordion label={faqItem.question} key={faqItem.slug}>
            {faqItem.reponse}
          </Accordion>
        ))}
      </div>
    </section>
  );
};
