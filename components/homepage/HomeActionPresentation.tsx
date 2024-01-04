import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";

export const HomeActionPresentation = ({
  image,
  label,
  buttonLabel,
  link,
}: {
  image: string;
  link: string;
  label: string;
  buttonLabel: string;
}) => {
  return (
    <div className="flex flex-col items-center max-w-[18rem]">
      <Image src={image} alt={buttonLabel} width={308} height={241} />
      <div className="mt-6 text-dsfr-text-label-blue-france text-lg font-bold text-center">{label}</div>
      <Button className="rounded-3xl mt-6" linkProps={{ href: link }}>
        {buttonLabel}
      </Button>
    </div>
  );
};
