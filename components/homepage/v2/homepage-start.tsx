import Link from "next/link";
import { homepageData } from "./homepage-data";
import Image from "next/image";
import clsx from "clsx";
import { Separator } from "@/components/common/separator";

export const HomepageStart = () => {
  const { start } = homepageData;
  return (
    <div className="bg-dsfr-background-alt-blue-france pb-11">
      <h3 className="text-pfmv-navy text-lg lg:text-[26px] py-10 font-bold lg:pt-14 lg:pb-20 mb-0 text-center">
        {start.title}
      </h3>
      <div className="mx-auto max-w-5xl">
        {start.lines.map((line, index) => (
          <>
            <div className={clsx("flex justify-between items-center flex-col lg:flex-row")} key={index}>
              <div className="max-w-xl">
                <div className="block mx-auto lg:hidden w-[331px]">
                  <Image
                    src={line.image.url}
                    width={0}
                    height={0}
                    alt="picto par où commencer"
                    className="mb-10 object-cover mx-auto h-auto w-[150px] lg:md:w-full"
                    sizes="50vw"
                  />
                </div>
                <h4
                  className={clsx(
                    "text-base text-center lg:text-left lg:text-[28px] text-pfmv-navy mb-3",
                    "px-10 lg:px-0",
                  )}
                >
                  {line.title}
                </h4>
                <p className="mb-8 text-center lg:text-left px-10 lg:px-0">{line.description}</p>
                <Link
                  className={clsx(
                    "fr-btn fr-btn--secondary !text-pfmv-navy !shadow-none rounded-3xl",
                    "border-[1px] border-pfmv-navy",
                    "mx-auto !block lg:!inline",
                  )}
                  href={line.cta.url}
                >
                  {line.cta.label}
                </Link>
              </div>
              <div
                className="hidden lg:block shrink-0 h-auto"
                style={{ width: line.image.width, height: line.image.height }}
              >
                <Image
                  src={line.image.url}
                  width={0}
                  height={0}
                  alt="picto par où commencer"
                  className="object-cover h-auto w-[150px] lg:md:w-full"
                  sizes="50vw"
                />
              </div>
            </div>
            {index === 0 && (
              <Separator className={clsx("mx-auto my-10 lg:my-20 bg-pfmv-navy opacity-10", "w-4/5 lg:w-full")} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};
