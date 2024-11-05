import { RetourExperienceContact } from "@/src/lib/strapi/types/components";
import { contactsSousTypeMap, contactsTypeMap } from "../helpers";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type SourcingSidePanelContactCardProps = {
  contact: RetourExperienceContact["attributes"];
};

export const SourcingSidePanelContactCard = ({ contact }: SourcingSidePanelContactCardProps) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const type = contactsTypeMap[contact.type_de_contact as unknown as keyof typeof contactsTypeMap];
  const sousType = contactsSousTypeMap[contact.sous_type_de_contact as unknown as keyof typeof contactsSousTypeMap];
  const label = contact.label as unknown as string;
  const email = contact.email as unknown as string;
  const tel = contact.telephone as unknown as string;

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopySuccess(field);
    setTimeout(() => setCopySuccess(null), 1000);
  };

  const CopyIcon = ({ text, field }: { text: string; field: string }) => (
    <>
      <i
        className="ri-file-copy-line relative h-4 w-4 cursor-pointer text-pfmv-navy before:!h-4 before:!w-4"
        onClick={() => handleCopy(text, field)}
        title="Cliquer pour copier"
      >
        <span
          className={clsx(
            // eslint-disable-next-line max-len
            "absolute -left-32 -top-6 w-36 rounded-md bg-white py-1 text-center text-xs not-italic shadow-pfmv-card-shadow",
            " pointer-events-none transition-opacity duration-500",
            copySuccess === field ? "opacity-100" : "opacity-0",
          )}
        >
          {field} copié
        </span>
      </i>
    </>
  );

  return (
    <div className="mb-4 w-[362px] overflow-hidden rounded-2xl border-[1px] border-dsfr-border-default-grey p-6">
      <div className="mb-6">
        <p className="fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon mb-2 !text-pfmv-navy">
          {type === "Collectivité" && (
            <Image
              src="/images/sourcing/sourcing-label-collectivite.svg"
              className="mr-1"
              width={16}
              height={16}
              alt=""
            />
          )}
          {type}
        </p>
      </div>
      <div>
        <h3 className="mb-1 text-lg font-bold">{sousType}</h3>
        <h4 className="mb-0 text-[16px]">{label}</h4>
        <div>
          <div className="mb-2">
            <span className="flex items-center justify-between">
              Email : <CopyIcon text={email} field="Email" />
            </span>
            <span className="block cursor-pointer text-pfmv-navy" onClick={() => handleCopy(email, "Email")}>
              {email}
            </span>
          </div>
          <div className="mb-2">
            <span className="flex items-center justify-between">
              Téléphone : <CopyIcon text={tel} field="Téléphone" />
            </span>
            <span className="block cursor-pointer" onClick={() => handleCopy(tel, "Téléphone")}>
              {tel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
