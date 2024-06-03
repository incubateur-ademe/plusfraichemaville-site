import { Oval } from "react-loader-spinner";

export const GenericSaveSpinner = () => (
  <div className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-pfmv-navy">
    <Oval strokeWidth={5} width={20} color="#fff" secondaryColor="rgba(255, 255, 255, 0.5)" />
  </div>
);
