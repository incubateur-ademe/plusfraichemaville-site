import Image from "next/image";
import PfmvProConnectButton from "@/src/components/authentication/pfmv-pro-connect-button";

export const BannerProjetUnauthenticated = () => (
  <div className="fr-container h-full">
    <div className="flex h-full items-center justify-between">
      <div className="flex items-center gap-5">
        <Image
          src="/images/espace-projet-incentive/banner-unauthenticated.png"
          alt=""
          width={200}
          height={200}
          className="w-[5rem]"
        />
        <div className="max-w-[40rem] text-lg font-bold">
          Connectez-vous et créez votre projet pour faire votre simulation budgétaire et accéder à de nombreux services.
        </div>
      </div>
      <PfmvProConnectButton />
    </div>
  </div>
);
