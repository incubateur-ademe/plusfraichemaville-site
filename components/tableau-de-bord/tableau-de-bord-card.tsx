import { PropsWithChildren } from "react";

type TableauDeBordCardProps = {
  title: string;
  progress: "0" | "50" | "100";
} & PropsWithChildren;

const progressState = (progress: TableauDeBordCardProps["progress"]) => {
  const state = {
    "0": { label: "non commencé", widthClass: "w-0" },
    "50": { label: "en cours", widthClass: "w-1/2" },
    "100": { label: "complété", widthClass: "w-full" },
  };

  return state[progress];
};

export const TableauDeBordCard = ({ title, progress, children }: TableauDeBordCardProps) => {
  const { label, widthClass } = progressState(progress);

  return (
    <div className="pfmv-card w-96 h-96 !rounded-2xl mb-8">
      <div className="h-1/2 !rounded-t-2xl bg-dsfr-border-default-blue-france flex justify-center items-center"></div>
      <div className="h-1/2 p-6">
        <h3 className="mb-8 text-xl text-dsfr-background-flat-blue-france">{title}</h3>
        <div className="mb-8">{children}</div>
        <div className="relative flex items-center">
          <div className="w-1/2 relative">
            <div
              // eslint-disable-next-line max-len
              className={`h-2 absolute left-0 bg-dsfr-background-action-high-success-hover rounded-3xl origin-top-left z-10 ${widthClass}`}
            ></div>
            <div className={`w-full h-2 relative bg-dsfr-border-default-grey rounded-3xl`}></div>
          </div>
          <svg
            className="mx-2"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              // eslint-disable-next-line max-len
              d="M11.5 23C5.152 23 0 17.848 0 11.5C0 5.152 5.152 0 11.5 0C17.848 0 23 5.152 23 11.5C23 17.848 17.848 23 11.5 23ZM10.35 16.1L18.4805 7.9695L16.859 6.348L10.35 12.857L7.0955 9.6025L5.474 11.224L10.35 16.1Z"
              fill="#27A959"
            />
          </svg>
          <span className="text-xs text-dsfr-background-action-high-success-hover">{label}</span>
        </div>
      </div>
    </div>
  );
};
