import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolutionResponse } from "../ficheSolution/type";
import FicheSolutionCardWithUserInfo from "../ficheSolution/FicheSolutionCardWithUserInfo";
import { useEffect, useState } from "react";
import { abortablePromise } from "@/helpers/abortable-promise";

export const FichesSolutionsProjetsSelectedCard = ({
  ficheSolutionId,
}: {
  ficheSolutionId: FicheSolutionResponse["id"];
}) => {
  const [data, setData] = useState<FicheSolutionResponse | null>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    abortablePromise(getFicheSolutionById(ficheSolutionId.toString()), signal)
      .then(setData)
      .catch((err) => {
        return err;
      });

    return () => {
      controller.abort();
    };
  }, [ficheSolutionId]);

  if (!data) {
    return null;
  }
  return <FicheSolutionCardWithUserInfo ficheSolution={data} projectName="" />;
};
