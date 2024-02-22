import React from "react";
import classNames from "classnames";

const RedAsterisk = ({ className }: { className?: string }) => (
  <span className={classNames("text-dsfr-text-error", className)}>*</span>
);

export default RedAsterisk;
