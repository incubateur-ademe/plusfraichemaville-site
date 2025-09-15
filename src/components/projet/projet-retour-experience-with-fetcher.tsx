import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { RetourExperienceContent } from "./projet-retour-experience-content";
import { GET_REX_BY_SLUG } from "@/src/helpers/routes";
import { AnnuaireRexContentSeeProjetModalSkeleton } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal-skeleton";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

type RetourExperienceProps = {
  retourExperienceSlug: string;
  isModal?: boolean;
};

export function RetourExperienceWithFetcher({ retourExperienceSlug, isModal }: RetourExperienceProps) {
  const { data: retourExperience } = useImmutableSwrWithFetcher<RetourExperience>(
    GET_REX_BY_SLUG(retourExperienceSlug),
  );

  return retourExperience ? (
    <RetourExperienceContent retourExperience={retourExperience} isModal={isModal} />
  ) : (
    <AnnuaireRexContentSeeProjetModalSkeleton />
  );
}
