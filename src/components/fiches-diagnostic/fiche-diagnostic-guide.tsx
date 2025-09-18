import CustomAccordion from "../common/CustomAccordion";
import Image from "next/image";
import clsx from "clsx";

export const FicheDiagnosticGuide = async () => {
  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">
        Choisir la bonne prestation de diagnostic de la surchauffe pour mon projet
      </h2>
      <p className="mb-12 leading-6">
        Cette rubrique vous aide à <strong>choisir la méthode de diagnostic adaptée</strong> pour commander une
        prestation auprès {"d'un"} bureau d’études. Elle vous oriente vers les études qui correspondent à votre projet,
        que ce soit pour évaluer l’impact du phénomène d’îlot de chaleur urbain sur votre commune ou le ressenti
        thermique des habitants dans un espace précis. À noter : ces deux approches se complètent souvent !
      </p>

      <CustomAccordion
        title={
          <div>
            <div>Combiner les échelles pour mieux évaluer la surchauffe urbaine</div>
            <div className="mt-1 text-lg font-normal">
              Une base de connaissances climatiques pour mieux choisir les méthodes de diagnostic
            </div>
          </div>
        }
        expanded={false}
        ariaId="guide-choisir-methode-diagnostic"
        className="mb-14 overflow-hidden rounded-2xl shadow-pfmv-card-shadow"
        bgColor="!bg-dsfr-background-alt-blue-france"
        btnTextColor="!text-pfmv-navy"
        btnTextPadding="!pt-6 !pb-10 !py-5"
        picto={
          <Image
            src="/images/fiches-diagnostic/guide-icone.svg"
            alt="Information"
            width={36}
            height={58}
            className="mr-5"
          />
        }
      >
        <div className="px-8 ">
          <Image
            src="/images/fiches-diagnostic/guide-ville.svg"
            alt="Représentation d'un îlot de chaleur urbain"
            width={970}
            height={322}
            className="absolute mt-[3%] hidden w-[80%] lg:block"
          />

          <Image
            src="/images/fiches-diagnostic/guide-personne.svg"
            alt="Représentation d'un îlot de chaleur urbain"
            width={450}
            height={500}
            className="absolute ml-[34%] mt-[32%] hidden lg:block"
          />
          <div
            className={clsx(
              "relative mb-6 flex flex-1 flex-col items-center justify-between gap-4",
              "lg:flex-row lg:items-start",
            )}
          >
            <div className="mt-[1rem] flex-1 basis-full rounded-2xl bg-white p-8 lg:mt-[26rem] lg:max-w-[28.5rem]">
              <div className="mb-6 text-lg text-pfmv-navy">
                <strong>Évaluer le confort thermique </strong>à l’échelle de la commune ou de l’espace public
              </div>
              <div className="mb-6">
                {"Évaluer le confort thermique permet d'identifier l’inconfort ressenti par les usagers. " +
                  "On tient compte des facteurs climatiques tels que le manque d’ombrage, l’humidité, le vent," +
                  " le rayonnement solaire ainsi que les facteurs physiologiques des individus."}
              </div>
              <div className="font-bold">Pourquoi mesurer le confort thermique ?</div>
              <div>
                On mesure le confort thermique pour mieux comprendre ce que ressent un passant et affiner l’analyse des
                ambiances thermiques d’un lieu. Ces données aident aussi à évaluer l’impact d’un aménagement urbain,
                qu’il soit déjà en place ou en projet, afin d’améliorer le bien-être en ville.
              </div>
            </div>
            <div className="flex-1 basis-full rounded-2xl bg-white p-8 lg:max-w-[28.5rem]">
              <div className="mb-6 text-lg text-pfmv-navy">
                <strong>Mesurer le phénomène d’îlot de chaleur urbain (ICU) </strong>à l’échelle de la commune
              </div>
              <div className="mb-6">
                {"L'effet d’îlot de chaleur urbain désigne une zone urbaine où la température est significativement" +
                  " plus élevée que dans les zones rurales environnantes."}
              </div>
              <div className="font-bold">Pourquoi mesurer l’ICU ?</div>
              <div>
                Mesurer l’ICU, c’est comprendre où la chaleur s’accumule en ville et identifier les endroits où agir en
                priorité. Cette cartographie permet d’adapter les aménagements pour rendre l’espace urbain plus
                respirable de manière durable. Lorsque l’on rafraîchit un lieu public, suivre son impact sur l’ICU aide
                à évaluer concrètement les améliorations apportées. Ces mesures offrent des repères pour ajuster et
                renforcer les stratégies d’adaptation.
              </div>
            </div>
          </div>
        </div>
      </CustomAccordion>
    </>
  );
};
