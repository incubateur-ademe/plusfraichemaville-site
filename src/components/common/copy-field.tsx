"use client";

import clsx from "clsx";
import { useState } from "react";

interface CopyFieldProps {
  label: string;
  value?: string;
  className?: string;
  noIcon?: boolean;
  onClick?: () => void;
}

export const CopyField = ({ label, value, className, onClick, noIcon }: CopyFieldProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async (text?: string, field?: string) => {
    if (text && field) {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000);
    }
  };

  const handleClick = () => {
    if (onClick != null) {
      onClick();
    }
    handleCopy(value, label);
  };

  return (
    <div className={clsx("mb-2 flex", !noIcon && "gap-2")}>
      <span className="flex items-center justify-between">
        <i
          className={clsx(
            !noIcon && "ri-file-copy-line relative h-4 w-4 cursor-pointer text-pfmv-navy before:!h-5 before:!w-5",
            !noIcon && "before:!mb-3",
            "relative",
          )}
          onClick={handleClick}
          title="Cliquer pour copier"
        >
          <span
            className={clsx(
              "absolute -left-0 -top-7 w-36 rounded-md bg-white",
              "py-1 text-center text-xs not-italic shadow-pfmv-card-shadow",
              "pointer-events-none transition-opacity duration-200",
              copySuccess ? "opacity-100" : "opacity-0",
            )}
          >
            {label} copié
          </span>
        </i>
      </span>
      <span className={clsx("block cursor-pointer pt-[2px]", className)} onClick={handleClick}>
        {value}
      </span>
    </div>
  );
};
