import Image from "next/image";
import PfmvProConnectButton from "@/src/components/authentication/pfmv-pro-connect-button";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const BannerProjetNoProjet = () => (
  <div className="fr-container h-full">
    <div className="flex h-full items-center justify-between">
      <div className="flex items-center gap-5">
        <Image
          src="/images/espace-projet/empty-projet.jpg"
          alt=""
          width={200}
          height={200}
          className="h-[3.5rem] w-[5rem]"
        />
        <div className="max-w-[40rem] text-lg font-bold">
          Créez votre premier projet pour faire votre simulation budgétaire et accéder à de nombreux services.
        </div>
      </div>
      <Button linkProps={{ href: PFMV_ROUTES.CREATE_PROJET }} className="rounded-3xl">
        Créer un projet
      </Button>
      <Button priority="secondary" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }} className="rounded-3xl">
        Accéder à mon espace
      </Button>
    </div>
  </div>
);
