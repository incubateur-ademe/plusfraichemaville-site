import Image from "next/image";

export const SourcingUserProjetLocation = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-9">
      <Image src="/images/sourcing/sourcing-my-location.svg" width={80} height={80} alt="" className="mb-4" />
      <h2 className="mb-4 text-lg">La collectivité de votre projet</h2>
      <p className="mb-7 text-center">Vous êtes sur le point de géolocalisation de la collectivité de votre projet.</p>
      <p className="mb-1 text-center">
        {"Pour découvrir d'autres prestataires, cliquez sur les autres projets à proximité."}
      </p>
    </div>
  );
};
