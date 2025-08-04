import clsx from "clsx";
import SimpleCustomAccordion from "@/src/components/common/simple-custom-accordion";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const SurchauffeUrbaineMapLczExplanation = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(className)}>
      <div className="mb-2 text-lg font-bold">Comment lire cette carte ?</div>
      <div className="mb-2 text-dsfr-text-title-grey">
        {"Les cartes LCZ (Zones Climatiques Locales) offrent une lecture standardisée du territoire fondée sur" +
          " l’occupation du sol et la morphologie urbaine. Elles distinguent 17 types de zones, utiles pour repérer" +
          " les secteurs potentiellement sensibles à la surchauffe. En phase de pré-diagnostic, les LCZ contribuent " +
          "à repérer des zones où une exposition à la surchauffe pourrait être plus marquée, en vue d’y installer des" +
          " capteurs ou d’orienter des actions de rafraîchissement."}
      </div>
      <SimpleCustomAccordion title="Points de vigilance" expanded={false} ariaId="a-savoir-explication-lcz">
        <div className="flex flex-row gap-6">
          <Image
            src="/images/surchauffe-urbaine/point-attention.svg"
            alt=""
            width={65}
            height={65}
            className="hidden shrink-0 md:block"
          />
          <span>
            Les LCZ sont issues d’un référentiel scientifique international. Fondées sur une classification
            géo-morphologique, elles ne permettent donc pas de quantifier l’ICU, ne reflètent pas les conditions
            météorologiques locales ni le confort thermique ressenti par les usagers. C’est un outil de pré-diagnostic
            qui peut être notamment complété par des campagnes de mesures (fixes ou mobiles) de la température de l’air
            notamment. La représentation partielle de certains éléments de voiries et le découpage de ces cartes à
            l’échelle de l’îlot urbain induisent des biais qui influencent la classification.
            <br />
            Outil gratuit, la cartographie LCZ doit être analysée au regard de la connaissance locale du territoire, et
            ne peut se substituer à des données climatiques ou à une analyse fine des usages et de la vulnérabilité face
            à la chaleur. Pour en savoir plus sur les biais à éviter pour leur analyser, et découvrir des exemples
            d’utilisation de cette données par les collectivités, consultez le guide utilisateur sur le{" "}
            <LinkWithoutPrefetch
              href="https://doc.cerema.fr/Default/doc/SYRACUSE/600739/cartographie-nationale-de-donnees-de-zones-climatiques-locales-guide-utilisateurs"
              target="_blank"
              className="font-bold"
            >
              site du Cerema
            </LinkWithoutPrefetch>
            .
          </span>
        </div>
      </SimpleCustomAccordion>
      <div
        className="mt-10 flex w-full flex-wrap items-center justify-between gap-4
      rounded-2xl bg-dsfr-background-default-grey-hover px-6 py-4 text-xl font-bold text-black"
      >
        <div>Pour aller plus loin, découvrez les méthodes de diagnostics dont vous avez besoin</div>
        <Button className="rounded-3xl text-center" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
          {"Accéder à l'espace projet !"}
        </Button>
      </div>
    </div>
  );
};
