export const makeFicheSolutionUrlApi = (id: string | number) => `/api/get-fiches-solutions?ficheSolutionIds=[${id}]`;
export const makeFicheSolutionCompleteUrlApi = (id: string | number | string[] | number[]) =>
  `/api/get-fiches-solutions-complete?ficheSolutionIds=[${id}]`;
