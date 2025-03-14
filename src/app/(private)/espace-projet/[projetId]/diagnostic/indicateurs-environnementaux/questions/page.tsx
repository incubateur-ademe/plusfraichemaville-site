"use client";
import IndicateursEnvironnementauxForm from "@/src/forms/indicateursEnvironnementaux/indicateurs-environnementaux-form";
import { useProjetsStore } from "@/src/stores/projets/provider";

export default function IndicateursEnvironnementauxPresentationPage() {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  return (
    <div className="fr-container ">
      <IndicateursEnvironnementauxForm projet={currentProjet} />
    </div>
  );
}
