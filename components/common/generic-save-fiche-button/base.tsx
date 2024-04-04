import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { GenericButtonAssets } from "./helpers";

export const GenericSaveBase = ({
  className,
  update,
  assets,
}: {
  update?: () => void;
  assets: GenericButtonAssets["saved"];
  className?: string;
}) => (
  <div className={className}>
    <Button
      onClick={update}
      className={clsx("!text-sm !w-fit !min-h-[2rem] !p-2 rounded-full !py-0", "flex justify-center items-center")}
    >
      <i className={clsx(`fr-icon--sm`, assets.code)}></i>
      {assets.label}
    </Button>
  </div>
);
