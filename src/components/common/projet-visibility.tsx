import clsx from "clsx";
import Image from "next/image";
import ToggleSwitch from "@codegouvfr/react-dsfr/ToggleSwitch";

type ProjetVisibilityProps = {
  isPublic?: boolean | null;
  isLoading?: boolean;
  onVisibilityChange: (_checked: boolean) => void;
  disabled?: boolean;
};

export const ProjetVisibility = ({ isPublic, isLoading, onVisibilityChange, disabled }: ProjetVisibilityProps) => {
  return (
    <div className="mb-14 mt-16 rounded-[20px] bg-dsfr-background-default-grey-hover p-8">
      {!isLoading ? (
        <p
          className={clsx(
            "fr-badge fr-badge--sm fr-badge--no-icon mb-2",
            isPublic ? "fr-badge--success" : "!text-dsfr-background-flat-red-marianne",
          )}
        >
          {isPublic ? (
            <Image src="/images/sourcing/sourcing-france-visible.svg" className="mr-1" width={11} height={11} alt="" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 size-3" viewBox="0 0 24 24" fill="currentColor">
              {/* eslint-disable-next-line max-len */}
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
            </svg>
          )}
          {isPublic ? "Visible" : "Masqué"} {"sur l'annuaire des projets"}
        </p>
      ) : (
        <div className="mb-2 h-[1.3575rem] w-[265px] animate-pulse rounded bg-dsfr-contrast-grey"></div>
      )}

      <div className="flex justify-between">
        <div className="flex max-w-4xl flex-col gap-4 [&>p]:mb-0">
          <p className="max-w-2xl text-xl font-bold">
            Souhaitez-vous rendre votre projet visible par les autres membres de la communauté Plus fraîche ma ville ?
          </p>
          <p>
            Rendez votre projet visible dans le module 6 pour partager son objet, sa localisation et son état
            d’avancement aux autres membres de la communauté. Grâce à cette fonctionnalité, découvrez les initiatives
            voisines, échangez avec d’autres porteurs de projet, et obtenez des contacts de prestataires.
          </p>
          <p>
            En tant qu’administrateur d’un projet, vos prénom, nom et adresse mail seront partagés avec les utilisateurs
            connectés.
          </p>
        </div>
        {!isLoading ? (
          <div className="[&>div]:-mr-8">
            <ToggleSwitch
              labelPosition="right"
              label=""
              inputTitle=""
              showCheckedHint={false}
              checked={isPublic ?? undefined}
              disabled={disabled}
              onChange={onVisibilityChange}
            />
          </div>
        ) : (
          <div className="-mr-8 h-6 w-[72px] rounded-full py-4">
            <div className="h-6 w-10 rounded-full bg-dsfr-contrast-grey"></div>
          </div>
        )}
      </div>
    </div>
  );
};
