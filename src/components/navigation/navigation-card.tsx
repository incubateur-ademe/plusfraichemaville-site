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
      className={clsx(
        className,
        "pointer-events-none max-w-[21rem] rounded-xl bg-white",
        "outline outline-1 outline-offset-0 outline-dsfr-border-default-grey hover:outline-dsfr-text-label-blue-france",
      )}
    >
      <Image width={400} height={500} alt="" src={imageUrl} />
      <div className="mb-6 mt-4 px-4 text-lg font-bold">{title}</div>
    </div>
  );
};
