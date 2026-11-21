import { Charte } from "@/src/lib/strapi/types/api/charte";
import { toCharteSignataires } from "@/src/components/charte/charte-helpers";
import { CharteSignatairesList } from "@/src/components/charte/charte-signataires-list";

export const CharteSignataires = ({ chartes }: { chartes: Charte[] }) => (
  <section className="fr-mb-7w">
    <h2 className="fr-h2">Qui l'a déjà signée ?</h2>
    <p className="fr-text--lg">À ce jour, {chartes.length} collectivités ont signé la charte.</p>
    <CharteSignatairesList signataires={toCharteSignataires(chartes)} />
  </section>
);
