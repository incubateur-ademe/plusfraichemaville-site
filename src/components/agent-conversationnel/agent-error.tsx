import clsx from "clsx";

export const AgentError = ({ error }: { error?: string }) => {
  return (
    <div
      className={clsx(
        "absolute z-10 rounded-xl bg-pfmv-climadiag-red px-3 py-2 font-bold text-white",
        "left-1/2 top-16 min-h-9 -translate-x-1/2 text-center",
        error ? "block" : "hidden",
      )}
    >
      {error}
    </div>
  );
};
