import SignInCard from "@/src/components/signin/SignInCard";
import { auth } from "@/src/lib/next-auth/auth";
import { redirect } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import clsx from "clsx";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { HomepageIdeeAction } from "@/src/components/homepage/homepage-idee-action";

export const metadata: Metadata = computeMetadata("Connectez-vous à l'espace projet");

export default async function Connexion(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session) {
    redirect(PFMV_ROUTES.ESPACE_PROJET);
  }

  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h3 !mb-9">Mon espace projet</h1>
      <div className="flex">
        <SignInCard
          message="connect"
          callbackUrl={searchParams.callbackUrl}
          className="lg:max-w-full lg:rounded-r-none"
        />
        <div
          className={clsx(
            "hidden w-full items-center rounded-r-2xl bg-dsfr-background-open-blue-france py-9 pl-[91px] pr-36 lg:flex",
          )}
        >
          <Image src="/images/espace-projet/connexion-espace-projet.svg" width={332} height={289} alt="" />
        </div>
      </div>
      <h2 className="mx-auto mb-8 mt-16 text-center text-2xl font-bold leading-7">
        Une fois connecté, créez votre projet, et accédez à tous ces services
      </h2>
      <HomepageIdeeAction displayTitle={false} />
    </div>
  );
}
