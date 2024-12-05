import Image from "next/image";
import { SourcingProjetVisibility } from "@/src/components/sourcing/sourcing-projet-visibility";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";

export const SourcingUserProjetLocation = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="m-auto flex flex-col items-center px-9">
        <Image src="/images/sourcing/sourcing-my-location.svg" width={80} height={80} alt="" className="mb-4" />
        <h2 className="mb-4 text-lg">Votre projet</h2>
        <p className="mb-7 text-center">Vous êtes sur le point de géolocalisation de votre projet.</p>
        <p className="mb-1 text-center">
          {"Pour découvrir d'autres prestataires, cliquez sur les autres projets à proximité."}
        </p>
      </div>
      <div className="px-4 pb-2">
        <SourcingProjetVisibility isLecteur={isLecteur} reduced />
      </div>
    </div>
  );
};
