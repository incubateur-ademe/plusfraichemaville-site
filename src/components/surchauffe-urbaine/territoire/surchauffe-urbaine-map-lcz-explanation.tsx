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
          " les secteurs potentiellement sensibles à la surchauffe. En phase de pré-diagnostic, les LCZ peuvent" +
          " suggérer des contrastes thermiques potentiels et orienter l’implantation de capteurs de mesure climatique."}
      </div>
      <span className="text-dsfr-text-default-grey">
        Pour en savoir plus sur la méthodologie scientifique utilisée,{" "}
        <LinkWithoutPrefetch
          href="https://www.cerema.fr/fr/actualites/cerema-publie-nouvelles-donnees-surchauffe-urbaine"
          target="_blank"
        >
          rendez-vous sur le site du Cerema.
        </LinkWithoutPrefetch>
      </span>
      <SimpleCustomAccordion title="À savoir" expanded={false} ariaId="a-savoir-explication-lcz">
        <div className="flex flex-row gap-6">
          <Image
            src="/images/surchauffe-urbaine/point-attention.svg"
            alt="Point d'attention"
            width={65}
            height={65}
            className="hidden shrink-0 md:block"
          />
          <span>
            Les LCZ ne permettent pas de quantifier le phénomène d’îlot de chaleur urbain (ICU), qui repose sur des
            mesures dynamiques de température de l’air (et non de surface). Elles ne reflètent pas non plus les
            conditions météorologiques locales, ni le confort thermique ressenti par les usagers. Par ailleurs, la
            représentation partielle de certains éléments de voiries et le découpage de ces cartes à l’échelle de l’îlot
            urbain induisent des biais qui influencent la classification.
            <br />
            Outil automatisé et reproductible, la cartographie LCZ est une porte d’entrée utile, mais elle ne peut se
            substituer à des données climatiques dynamiques ou à une analyse fine des usages et de la vulnérabilité face
            à la chaleur. Elle doit donc être complétée pour orienter efficacement les stratégies d’adaptation au
            changement climatique.
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
