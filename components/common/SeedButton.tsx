"use client";

import { seedDummyProjetAction } from "@/actions/projets/seed-dummy-projet-action";
import Button from "@codegouvfr/react-dsfr/Button";

/**
 * Helper button to seed the databases following /api/seed-dummy-data route.
 */
export const SeedButton = () => {
  return (
    <Button className="fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl" onClick={() => seedDummyProjetAction()}>
      Seed
    </Button>
  );
};
