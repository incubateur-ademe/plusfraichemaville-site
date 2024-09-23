import clsx from "clsx";
import { useState } from "react";
import { Hidden } from "./hidden";

type PopupMenuProps = {
  links: {
    label: string;
    iconId: string;
    className: string;
    onClick: () => void;
  }[];
};

export const PopupMenu = ({ links }: PopupMenuProps) => {
  const [open, setOpen] = useState(false);
  const opener = () => setOpen(!open);
  const closer = () => setOpen(false);

  return (
    <div className="shrink-0">
      <button
        onClick={opener}
        className={clsx(
          "block size-10 rounded-full border-[1px] border-solid border-dsfr-border-default-grey hover:!bg-white",
        )}
      >
        <Hidden accessible>{"Plus d'actions"}</Hidden>
        <i className="ri-more-2-line size-6" />
      </button>
      {open && (
        <>
          <div className="fixed left-0 top-0 z-30 size-full" onClick={closer}></div>
          <div className={clsx("absolute right-0 top-[130%] z-40 bg-white px-5 pb-1 pt-3 shadow-pfmv-card-shadow")}>
            <ul className="relative z-10 pl-0">
              {links.map((link, index) => (
                <li className={`mb-3 list-none text-sm ${link.className} font-bold`} key={index}>
                  <i className={clsx(link.iconId, "mr-2 size-6 before:!size-5")} />
                  <button
                    onClick={() => {
                      closer();
                      link.onClick();
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
