import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { RetourExperienceContent } from "./projet-retour-experience-content";
import { RetourExperienceResponse } from "../ficheSolution/type";
import { GET_REX_BY_SLUG } from "@/src/helpers/routes";

type RetourExperienceProps = {
  params: { retourExperienceSlug: string };
  isModal?: boolean;
};

export function RetourExperienceClient({ params, isModal }: RetourExperienceProps) {
  const { data: retourExperience } = useImmutableSwrWithFetcher<RetourExperienceResponse>(
    GET_REX_BY_SLUG(params.retourExperienceSlug),
  );

  return retourExperience ? <RetourExperienceContent retourExperience={retourExperience} isModal={isModal} /> : null;
}
