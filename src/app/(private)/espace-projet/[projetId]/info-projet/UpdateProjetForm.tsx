"use client";
import { ProjetInfoForm } from "@/src/forms/projet/ProjetInfoForm";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useShallow } from "zustand/react/shallow";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

export default function UpdateProjetForm() {
  const { getCurrentProjet } = useProjetsStore(useShallow((state) => state));
  const currentProjet = getCurrentProjet();
  const canEditProjet = useCanEditProjet(currentProjet?.id);

  return <ProjetInfoForm projet={currentProjet} readOnly={!canEditProjet} />;
}
