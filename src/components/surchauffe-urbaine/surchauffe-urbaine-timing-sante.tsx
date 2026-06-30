import React from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const SurchauffeUrbaineTimingSante = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h1 className="text-center text-[1.375rem] font-bold ">
        Et si vous croisiez votre diagnostic de surchauffe avec la santé des habitants ?
      </h1>
      <p>
        Pour savoir où prioriser l’action, et dans la logique d’un <strong>urbanisme favorable à la santé</strong>, il
        est nécessaire de croiser le <strong>diagnostic de surchauffe urbaine</strong> avec l’état de santé (physique,
        mentale et perçue) des populations.
      </p>
      <p>
        <strong>Certaines populations sont plus vulnérables face à la chaleur</strong> : personnes âgées, enfants,
        habitants de quartiers prioritaires... Les identifier dès la phase de diagnostic est important afin qu’elles
        bénéficient des premières actions de rafraîchissement.
      </p>
      <p>
        Pour aller plus loin,{" "}
        <LinkWithoutPrefetch
          href="https://librairie.ademe.fr/urbanisme-territoires-et-sols/263-guide-isadora-une-demarche-d-accompagnement-a-l-integration-de-la-sante-dans-les-operations-d-amenagement-urbain-le.html"
          target="_blank"
          className="text-pfmv-navy"
        >
          le guide Isadora de l’Ecole des hautes études en santé publique (EHESP)
        </LinkWithoutPrefetch>{" "}
        recommande de croiser trois dimensions :
      </p>
      <ul className="mb-4 list-disc md:ml-4">
        <li>
          <strong>l’état de santé physique</strong> basé sur des indicateurs variés : taux de maladies respiratoires,
          taux de maladies cardiovasculaires, taux de personnes diabétiques, analyse des causes médicales de décès, etc.
        </li>
        <li>
          <strong>l’état de santé mentale</strong> basé sur des indicateurs de santé : taux de mortalité due au suicide,
          tentatives de suicide, les taux de mortalité due à la toxicomanie et à l’alcool, etc.)
        </li>
        <li>
          <strong>l’état de santé perçue</strong> basé sur des indicateurs de bien-être : sentiment de détresse et de
          bien-être psychologique, perception des risques, estime de soi, sentiment d’appartenance à la communauté,
          etc.)
        </li>
      </ul>
      <p>
        Ce croisement est au fondement du principe d’urbanisme favorable à la santé : rafraîchir là où c'est le plus
        nécessaire, pour ceux qui en ont le plus besoin.
      </p>
      <div className="text-center">
        <LinkWithoutPrefetch
          href={PFMV_ROUTES.SURCHAUFFE_URBAINE_RISQUES_SANTE}
          className="fr-btn fr-btn--secondary mt-8 rounded-3xl"
        >
          Surchauffe urbaine et santé : comprendre les risques pour mieux protéger les habitants
        </LinkWithoutPrefetch>
      </div>
    </div>
  );
};
