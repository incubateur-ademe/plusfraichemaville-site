"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { RexContactId } from "@/src/components/annuaire/types";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireTitle = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const inProgressProjetContacts = currentProjet?.sourcingUserProjets;
  const rexContactIds = currentProjet?.sourcingRex as RexContactId[] | null;
  const nbContacts = (inProgressProjetContacts?.length || 0) + (rexContactIds?.length || 0);

  return (
    <div className="mb-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-6">
        <h2 className="mb-0 text-[1.75rem]">Carte des projets et des contacts</h2>
        {nbContacts > 0 && (
          <Button
            onClick={(e: any) => {
              const element = document.getElementById("annuaire-saved-contacts");
              if (element) {
                e.preventDefault();
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            priority="secondary"
            iconId="ri-arrow-down-line"
            iconPosition="right"
            className=" rounded-3xl"
          >
            Voir mes contacts sauvegardés ({nbContacts})
          </Button>
        )}
      </div>
      <p className="max-w-[45rem]">
        Inspirez-vous des projets réalisés ou en cours pour identifier les contacts appropriés à votre projet et les
        sauvegarder.
      </p>
    </div>
  );
};
