import clsx from "clsx";
import Image from "next/image";

export const NavigationCard = ({
  imageUrl,
  title,
  className,
}: {
  imageUrl: string;
  title: string;
  className?: string;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={clsx(className, "pfmv-flat-card max-w-[21rem] bg-white")}
    >
      <Image width={400} height={500} alt="" src={imageUrl} className="px-[1px]" />
      <div className="mb-6 mt-4 px-4 text-lg font-bold">{title}</div>
    </div>
  );
};
