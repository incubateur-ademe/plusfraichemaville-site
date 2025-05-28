/* eslint-disable no-undef */

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type HomepageStoryProps = {
  story: {
    title: string;
    code: string;
    slug: string;
    image: string;
    alt: string;
  };
};

export const HomepageStory = ({ story }: HomepageStoryProps) => {
  const typeSolution = getTypeSolutionFromCode(story.code);

  return (
    <div className="group">
      <Link href={`${PFMV_ROUTES.FICHES_SOLUTIONS}/${story.slug}`} prefetch={false}>
        <div
          className={clsx(
            "flex shrink-0 flex-col justify-end rounded-2xl pt-5 md:h-[540px] md:w-[358px]",
            "relative h-[296px] w-[210px] overflow-hidden",
            "px-5 py-5 md:px-8 md:py-10",
            `gradient-solution-${typeSolution?.code}`,
          )}
        >
          {typeSolution && (
            <div className="mb-2 flex text-sm text-white md:text-lg">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <h3 className="m-0 text-base text-white md:text-[22px] md:leading-7">{story.title}</h3>
          <Image
            src={story.image}
            alt={story.alt}
            fill
            sizes="60vw"
            className="-z-10 object-cover transition-transform duration-300 ease-in group-hover:scale-[1.05]"
          />
        </div>
      </Link>
    </div>
  );
};
