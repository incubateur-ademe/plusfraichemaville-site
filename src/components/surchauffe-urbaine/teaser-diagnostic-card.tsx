import clsx from "clsx";
import Image from "next/image";

export const TeaserDiagnosticCard = ({
  imageUrl,
  title,
  description,
  className,
}: {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={clsx(className, "w-[21rem] rounded-xl bg-white text-left")}>
      <Image width={400} height={500} alt="" src={imageUrl} className="rounded-t-xl" />
      <div className="mt-6 px-4 text-lg font-bold text-pfmv-navy">{title}</div>
      <div className="mb-10 mt-4 px-4">{description}</div>
    </div>
  );
};
