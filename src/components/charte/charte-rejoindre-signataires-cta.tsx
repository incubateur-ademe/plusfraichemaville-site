import clsx from "clsx";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const CharteRejoindreSignatairesCta = ({ className }: { className?: string }) => (
  <div className={clsx("bg-dsfr-background-alt-blue-france p-8", className)}>
    <p className="fr-h5 !mb-6">Votre collectivité pourrait être la première de sa région.</p>
    <LinkWithoutPrefetch href={PFMV_ROUTES.CONTACT} className="fr-btn">
      Rejoindre les signataires
    </LinkWithoutPrefetch>
  </div>
);
