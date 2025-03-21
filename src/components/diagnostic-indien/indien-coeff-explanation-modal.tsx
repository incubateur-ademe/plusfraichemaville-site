import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { IndienType } from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";
import clsx from "clsx";

export default function IndienCoeffExplanationModal({ coefficient }: { coefficient: IndienType }) {
  const modal = createModal({
    id: `indien-coeff-explanation-modal-${coefficient.label}`,
    isOpenedByDefault: false,
  });

  return (
    <>
      <i
        className={clsx("ri-information-2-line float-right cursor-pointer", coefficient.textColor)}
        onClick={() => modal.open()}
      />
      <modal.Component size="large" title="" className="custom-modal">
        <div className="flex flex-row ">
          <Image src={coefficient.icone} height={51} width={51} alt="" className="mr-4 h-12" />
          <div className="mt-3">
            <h1 className={clsx("!text-xl", coefficient.textColor)}>{coefficient.explanationTitle}</h1>
            <div className="mb-6">{coefficient.explanation}</div>
            <span>
              <Link
                className="!text-pfmv-navy after:hidden"
                download
                target="_blank"
                href="/documents/diagnostic/indicateurs-environnementaux/pfmv-calcul-indicateurs-environnementaux.pdf"
              >
                Télécharger la notice de calcul
                <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
              </Link>
            </span>
            <div className="float-right mt-20 flex items-center gap-2">
              Coefficient de calcul créés par
              <Link href={"https://www.tribu.coop/"} target="_blank">
                TRIBU
              </Link>
              <Image
                src="/images/fiches-diagnostic/indicateurs-environnementaux/logo-tribu.jpg"
                width={250}
                height={222}
                alt="Logo du bureau d'étude TRIBU"
                className="ml-4 w-10"
              />
            </div>
          </div>
        </div>
      </modal.Component>
    </>
  );
}
