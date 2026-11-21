import clsx from "clsx";

export const CharteRejoindreSignatairesCta = ({ className }: { className?: string }) => (
  <div className={clsx("bg-dsfr-background-alt-blue-france p-8", className)}>
    <p className="fr-h5 !mb-6">Votre collectivité pourrait être la première de sa région.</p>
    <a href="#comment-signer" className="fr-btn">
      Rejoindre les signataires
    </a>
  </div>
);
