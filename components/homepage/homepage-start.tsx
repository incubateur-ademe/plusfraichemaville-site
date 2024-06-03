import Link from "next/link";
import { homepageData } from "./homepage-data";
import Image from "next/image";
import clsx from "clsx";
import { Separator } from "@/components/common/separator";

export const HomepageStart = () => {
  const { start } = homepageData;
  return (
    <div className="bg-dsfr-background-alt-blue-france pb-11">
      <h3 className="mb-0 py-10 text-center text-lg font-bold text-pfmv-navy lg:pb-20 lg:pt-14 lg:text-[26px]">
        {start.title}
      </h3>
      <div className="mx-auto max-w-5xl">
        {start.lines.map((line, index) => (
          <div key={index}>
            <div className={clsx("flex flex-col items-center justify-between lg:flex-row")}>
              <div className="max-w-xl">
                <div className="mx-auto block w-[331px] lg:hidden">
                  <Image
                    src={line.image.url}
                    width={0}
                    height={0}
                    alt="picto par où commencer"
                    className="mx-auto mb-10 h-auto w-[150px] object-cover lg:md:w-full"
                    sizes="50vw"
                  />
                </div>
                <h4
                  className={clsx(
                    "mb-3 text-center text-base text-pfmv-navy lg:text-left lg:text-[28px]",
                    "px-10 lg:px-0 lg:leading-8",
                  )}
                >
                  {line.title}
                </h4>
                <p className="mb-8 px-10 text-center lg:px-0 lg:text-left">{line.description}</p>
                <Link
                  className={clsx(
                    "fr-btn fr-btn--secondary rounded-3xl !text-pfmv-navy !shadow-none",
                    "border-[1px] border-pfmv-navy",
                    "mx-auto !block lg:!inline",
                  )}
                  href={line.cta.url}
                >
                  {line.cta.label}
                </Link>
              </div>
              <div
                className="hidden h-auto shrink-0 lg:block"
                style={{ width: line.image.width, height: line.image.height }}
              >
                <Image
                  src={line.image.url}
                  width={0}
                  height={0}
                  alt="picto par où commencer"
                  className="h-auto w-[150px] object-cover lg:md:w-full"
                  sizes="50vw"
                />
              </div>
            </div>
            {index === 0 && (
              <Separator className={clsx("mx-auto my-10 bg-pfmv-navy opacity-10 lg:my-20", "w-4/5 lg:w-full")} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
