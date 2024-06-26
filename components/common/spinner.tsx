import clsx from "clsx";

type SpinnerProps = {
  pathColor?: string;
  circleColor?: string;
  className?: string;
};

export const Spinner = ({ className, pathColor, circleColor }: SpinnerProps) => {
  return (
    <div className={clsx("size-8 content-center rounded-full", className)}>
      <svg className="m-1 animate-spin text-white" fill="none" viewBox="0 0 24 24">
        <circle
          className={clsx("opacity-100", circleColor)}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className={clsx("opacity-75", pathColor)}
          fill="#000091"
          /* eslint-disable max-len */
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
