import clsx from "clsx";
import { useState } from "react";

interface CopyFieldProps {
  label: string;
  value?: string;
  className?: string;
}

export const CopyField = ({ label, value, className }: CopyFieldProps) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopy = async (text?: string, field?: string) => {
    if (text && field) {
      await navigator.clipboard.writeText(text);
      setCopySuccess(field);
      setTimeout(() => setCopySuccess(null), 1000);
    }
  };

  return (
    <div className={clsx("mb-2")}>
      <span className="flex items-center justify-between">
        {label} :{" "}
        <i
          className={clsx(
            "ri-file-copy-line relative h-4 w-4 cursor-pointer text-pfmv-navy before:!h-5 before:!w-5",
            "before:!mb-3",
          )}
          onClick={() => handleCopy(value, label)}
          title="Cliquer pour copier"
        >
          <span
            className={clsx(
              "absolute -left-32 -top-7 w-36 rounded-md bg-white",
              "py-1 text-center text-xs not-italic shadow-pfmv-card-shadow",
              "pointer-events-none transition-opacity duration-200",
              copySuccess === label ? "opacity-100" : "opacity-0",
            )}
          >
            {label} copié
          </span>
        </i>
      </span>
      <span className={clsx("block cursor-pointer", className)} onClick={() => handleCopy(value, label)}>
        {value}
      </span>
    </div>
  );
};
