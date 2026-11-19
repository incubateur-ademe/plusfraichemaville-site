import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { getAllChartes } from "@/src/lib/strapi/queries/chartes-queries";
import clsx from "clsx";

const getSignatairesLabel = (nbChartes: number) => {
  if (nbChartes === 0) {
    return "Des collectivités ont déjà signé";
  }
  return `${nbChartes} collectivités ont déjà signé`;
};

export const HomepageCharte = async () => {
  const chartes = await getAllChartes();

  return (
    <section
      className={clsx(
        "fr-py-7w mx-auto w-full bg-dsfr-beige-galet",
        "bg-[url(/images/homepage/wave-bg-charte.svg)] bg-[position:left_bottom_-1rem] bg-no-repeat",
      )}
    >
      <div className="fr-container">
        <h2 className="fr-h2 fr-mb-6w text-center">Une charte pour aller plus loin !</h2>
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div>
            <p className="fr-h3 text-pfmv-navy">
              {getSignatairesLabel(chartes.length)} notre charte d’engagement pour le rafraîchissement urbain.
              <br />
              Rejoignez-les !
            </p>

            <LinkWithoutPrefetch href={PFMV_ROUTES.INFO_CHARTE} className="fr-btn fr-btn--secondary">
              Découvrir la charte et les signataires
            </LinkWithoutPrefetch>
          </div>
          <Image src="/images/homepage/header-charte-pfmv.jpg" alt="" width="400" height="300" />
        </div>
      </div>
    </section>
  );
};
