import Image from "next/image";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { IndienType } from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function IndienCoeffExplanationModal({ coefficient }: { coefficient: IndienType }) {
  const modal = createModal({
    id: `indien-coeff-explanation-modal-${coefficient.label}`,
    isOpenedByDefault: false,
  });

  return (
    <>
      <button
        className="ri-information-2-line float-right cursor-pointer text-dsfr-text-mention-grey"
        onClick={() => modal.open()}
      />
      <modal.Component
        size="large"
        title={
          <div className="flex flex-row items-center gap-2">
            <Image src={coefficient.icone} height={51} width={51} alt="" className="mr-4 h-12" />
            {coefficient.explanationTitle}
          </div>
        }
        titleProps={{ className: coefficient.textColor }}
        className="custom-modal"
      >
        <div className="mb-6">{coefficient.explanation}</div>
        <span>
          <LinkWithoutPrefetch
            className="!text-pfmv-navy after:hidden"
            download
            target="_blank"
            href="/documents/diagnostic/indicateurs-environnementaux/pfmv-calcul-indicateurs-environnementaux.pdf"
          >
            Télécharger la notice de calcul
            <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
          </LinkWithoutPrefetch>
        </span>
        <div className="float-right mb-12 mt-20 flex items-center gap-2">
          Coefficient de calcul créés par
          <LinkWithoutPrefetch href={"https://www.tribu.coop/"} target="_blank">
            TRIBU
          </LinkWithoutPrefetch>
          <Image
            src="/images/fiches-diagnostic/indicateurs-environnementaux/logo-tribu.jpg"
            width={250}
            height={222}
            alt="Logo du bureau d'étude TRIBU"
            className="ml-4 w-10"
          />
        </div>
      </modal.Component>
    </>
  );
}
