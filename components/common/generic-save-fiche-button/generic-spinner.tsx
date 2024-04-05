import { Oval } from "react-loader-spinner";

export const GenericSaveSpinner = () => (
  <div className="bg-pfmv-navy w-8 h-8 rounded-full flex justify-center items-center absolute top-3 right-4">
    <Oval strokeWidth={5} width={20} color="#fff" secondaryColor="rgba(255, 255, 255, 0.5)" />
  </div>
);
