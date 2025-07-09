import Image from "next/image";
import React from "react";
import { TypeFicheSolution } from "@/src/helpers/type-fiche-solution";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const IndienResultCombinaisonAdvice = ({
  typeSolution,
  projetId,
}: {
  typeSolution: TypeFicheSolution;
  projetId: number;
}) => {
  return (
    <div className="flex w-full items-center rounded-2xl bg-dsfr-background-default-grey">
      <div className="hidden h-full w-80 shrink-0 grow-0 md:flex">
        <Image
          width={450}
          height={300}
          src={typeSolution.cardImage}
          alt={typeSolution.label}
          className={"h-full w-full rounded-l-2xl"}
        />
      </div>
      <div className="mx-8 my-2">
        <div className={`text-xl font-bold ${typeSolution.colorClass}`}>
          {typeSolution.coloredIcon(" mr-4")}
          {typeSolution.titleExplanation}
        </div>
        <div className={"mt-4 text-dsfr-text-default-grey"}>{typeSolution.explanation}</div>
        <div className="mt-1 text-sm text-dsfr-text-mention-grey">
          exemples :{" "}
          {typeSolution.exampleCards.map((exampleCard, index) => [
            index > 0 && ", ",
            <LinkWithoutPrefetch
              key={exampleCard.slug}
              href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION(projetId, exampleCard.slug)}
            >
              {exampleCard.title}
            </LinkWithoutPrefetch>,
          ])}
        </div>
        <LinkWithoutPrefetch
          className="fr-btn fr-btn--tertiary fr-btn--sm mt-6 rounded-3xl"
          href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_TYPE_FILTER(projetId, typeSolution.code)}
        >
          {typeSolution.textButton}
        </LinkWithoutPrefetch>
      </div>
    </div>
  );
};
