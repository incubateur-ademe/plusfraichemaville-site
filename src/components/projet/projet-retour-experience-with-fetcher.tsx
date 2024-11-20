import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { RetourExperienceContent } from "./projet-retour-experience-content";
import { RetourExperienceResponse } from "../ficheSolution/type";
import { GET_REX_BY_SLUG } from "@/src/helpers/routes";
// eslint-disable-next-line max-len
import { SourcingRexContentSeeProjetModalSkeleton } from "../sourcing/side-panel/sourcing-rex-content-see-projet-modal-skeleton";

type RetourExperienceProps = {
  retourExperienceSlug: string;
  isModal?: boolean;
};

export function RetourExperienceWithFetcher({ retourExperienceSlug, isModal }: RetourExperienceProps) {
  const { data: retourExperience } = useImmutableSwrWithFetcher<RetourExperienceResponse>(
    GET_REX_BY_SLUG(retourExperienceSlug),
  );

  return retourExperience ? (
    <RetourExperienceContent retourExperience={retourExperience} isModal={isModal} />
  ) : (
    <SourcingRexContentSeeProjetModalSkeleton />
  );
}
