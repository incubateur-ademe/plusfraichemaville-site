// Has to put force-dynamic while https://github.com/vercel/next.js/issues/56018 is not fixed
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir={"rtl"}>
        <div className={"h-80 relative"}>
          <Image
            src={"/images/homepage/carrousel1.jpg"}
            alt={"Image de rafraîchissement urbain"}
            fill={true}
            className={"object-cover"}
          />
        </div>
        <div className={"text-left mt-10"}>
          <h4 className={"text-pfmv-light-blue"}>Rafraîchissez efficacement votre collectivité</h4>
          <p className={"text-dsfr-text-label-blue-france"}>
            L’outil d’aide à la décision que vous co-construisez avec nous, pour vous accompagner dans le choix de
            solutions de rafraîchissement urbain pérennes et durables
          </p>
          <Button
            linkProps={{
              href: "/aide-decision",
            }}
          >
            Trouvez votre solution adaptée et durable
          </Button>
        </div>
      </div>{" "}
    </main>
  );
}
