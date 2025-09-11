import { PropsWithChildren } from "react";
import { EstimationMateriauModalContainer } from "@/src/components/estimation/materiaux-modal/estimation-materiaux-modal-container";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      {children}
      <EstimationMateriauModalContainer />
    </>
  );
}
