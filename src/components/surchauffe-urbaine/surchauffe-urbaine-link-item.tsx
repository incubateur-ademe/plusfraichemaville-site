import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

export const SurchauffeUrbaineLinkItem = ({
  pictoUrl,
  linkUrl,
  linkText,
  className,
}: {
  pictoUrl: string;
  linkUrl: string;
  linkText: string;
  className?: string;
}) => {
  return (
    <div className={clsx(className, "flex flex-col items-center gap-2 md:flex-row")}>
      <div className="size-14 content-center rounded-lg bg-dsfr-background-alt-blue-france">
        <Image width={35} height={35} alt="" src={pictoUrl} className="mx-auto" />
      </div>
      <Link className="font-bold text-pfmv-navy" href={linkUrl}>
        {linkText}
      </Link>
    </div>
  );
};
