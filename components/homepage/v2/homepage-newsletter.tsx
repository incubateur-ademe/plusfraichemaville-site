import clsx from "clsx";
import { homepageData } from "./homepage-data";
import { Input } from "@codegouvfr/react-dsfr/Input";

export const HomepageNewsletter = () => {
  const { newsletter } = homepageData;

  return (
    <div className="bg-dsfr-background-alt-blue-france pt-14 pb-20">
      <div className="fr-container flex gap-9">
        <div className="max-w-xl">
          <h3 className="font-bold text-[22px] mb-4">{newsletter.title}</h3>
          <p>{newsletter.subtitle}</p>
        </div>
        <div className="w-full">
          <div className="relative">
            <Input
              className={clsx(
                "!mb-3 border-b-[2px] border-b-pfmv-navy [&>*]:!shadow-none",
                "[&>*]:!bg-white",
                "[&>label]:!absolute h-full",
                "[&>label]:!left-2",
                "[&>label]:!pt-2 [&>label]:!text-pfmv-grey",
                "[&>label]:!pt-2 [&>label]:!italic",
              )}
              label={newsletter.input.label}
            />
            <button className="fr-btn absolute top-0 right-0">{"S'abonner"}</button>
          </div>
          <small className="font-normal text-pfmv-grey text-xs block leading-5">{newsletter.input.info}</small>
        </div>
      </div>
    </div>
  );
};
