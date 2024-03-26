import Link from "next/link";
import { homepageData } from "./homepage-data";
import Image from "next/image";
import clsx from "clsx";
import { Separator } from "@/components/common/separator";

export const HomepageStart = () => {
  const { start } = homepageData;
  return (
    <div className="bg-dsfr-background-alt-blue-france pb-11">
      <h3 className="text-pfmv-navy text-[26px] font-bold pt-14 pb-20 mb-0 text-center">{start.title}</h3>
      <div className="mx-auto max-w-5xl">
        {start.lines.map((line, index) => (
          <>
            <div className={clsx("flex justify-between items-center")} key={index}>
              <div className="max-w-xl">
                <h4 className="text-[28px] text-pfmv-navy mb-3">{line.title}</h4>
                <p className="mb-8">{line.description}</p>
                <Link
                  className={clsx(
                    "fr-btn fr-btn--secondary !text-pfmv-navy !shadow-none rounded-3xl",
                    "border-[1px] border-pfmv-navy",
                  )}
                  href={line.cta.url}
                >
                  {line.cta.label}
                </Link>
              </div>
              <div className="relative shrink-0">
                <Image
                  src={line.image.url}
                  width={line.image.width}
                  height={line.image.height}
                  alt="picto par où commencer"
                  objectFit="cover"
                />
              </div>
            </div>
            {index === 0 && <Separator className="my-20 bg-pfmv-navy opacity-20" />}
          </>
        ))}
      </div>
    </div>
  );
};
