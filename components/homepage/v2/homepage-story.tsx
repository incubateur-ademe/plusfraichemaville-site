/* eslint-disable no-undef */

import { PFMV_ROUTES } from "@/helpers/routes";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
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
      <Link href={`${PFMV_ROUTES.FICHES_SOLUTIONS}/${story.slug}`}>
        <div
          className={clsx(
            "md:w-[358px] md:h-[540px] shrink-0 rounded-2xl flex justify-end flex-col pt-5",
            "w-[210px] h-[296px] relative overflow-hidden",
            "md:py-10 px-5 md:px-8 py-5",
            `gradient-solution-${typeSolution?.code}`,
          )}
        >
          {typeSolution && (
            <div className="flex text-sm md:text-lg mb-2 text-white">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <h4 className="text-white text-base md:text-[22px] md:leading-7 m-0">{story.title}</h4>
          <Image
            src={story.image}
            alt={story.alt}
            fill
            sizes="60vw"
            className="-z-10 object-cover group-hover:scale-[1.05] transition-transform duration-300 ease-in"
          />
        </div>
      </Link>
    </div>
  );
};
