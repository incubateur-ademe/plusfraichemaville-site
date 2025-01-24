import SignInCard from "@/src/components/signin/SignInCard";
import { auth } from "@/src/lib/next-auth/auth";
import { redirect } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import clsx from "clsx";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Créez votre projet");

const data = {
  mainTitle: "Mon espace projet",
  title: "Une fois connecté, créez votre projet, et accédez à tous ces services",
  blocs: [
    {
      title: "Faites une estimation de budget de votre projet",
      description: "Sélectionnez des matériaux et estimez le coût des solutions",
      picto: "estimation",
    },
    {
      title: "Invitez des membres à collaborer sur votre projet",
      description: "Partagez la conception de votre projet au sein de votre collectivité",
      picto: "collaborer",
    },
    {
      title: "Trouvez des financements adaptés à votre projet",
      description: "Identifiez les aides et les contacts nécessaires pour préparer un dossier de financement.",
      picto: "financement",
    },
    {
      title: "Annuaire des projets Plus fraîche ma ville",
      description:
        "Trouvez les contacts utiles à votre projet : agents de collectivités, bureaux d'étude, AMO, entreprises.",
      picto: "annuaire",
    },
  ],
};

export default async function Connexion(props: { searchParams: Promise<{ callbackUrl: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session) {
    redirect(PFMV_ROUTES.ESPACE_PROJET_LISTE);
  }

  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h3 !mb-9">{data.mainTitle}</h1>
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
      <h2 className="mx-auto mb-20 mt-16 w-[420px] text-center text-[22px] font-bold leading-7">{data.title}</h2>
      <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-[90px]">
        {data.blocs.map((bloc, index) => (
          <div className="flex w-full max-w-[500px] justify-start gap-8" key={index}>
            <Image
              className="h-full shrink-0"
              src={`/images/espace-projet/${bloc.picto}.svg`}
              width={134}
              height={134}
              alt=""
            />
            <div>
              <h3 className="mb-3 text-[22px] font-bold leading-7">{bloc.title}</h3>
              <p className="mb-4 text-lg">{bloc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
