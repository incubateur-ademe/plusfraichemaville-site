// import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
// import useSWR from "swr";
//
// export const useRetrieveFicheSolutionCMSInfo = (fichesSolutionsIds: number[]) => {
//   const fetcher = (fsIds: number[]) => {
//     const f = (ficheSolutionId: number) => getFicheSolutionById(`${ficheSolutionId}`);
//     return Promise.all(fichesSolutionsIds.map((fsId) => f(fsId)));
//   };
//   const swrKey = `ficheSolution-${ficheSolutionId}`;
//   // const fetcher = () => getFicheSolutionById(`${ficheSolutionId}`);
//   return useSWR(fichesSolutionsIds, fetcher);
// };
