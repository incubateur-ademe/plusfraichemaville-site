import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { HomepageIntro } from "@/src/components/homepage/homepage-intro";
import { HomepageIdeeAction } from "@/src/components/homepage/homepage-idee-action";
import { HomepageSurchauffeUrbaine } from "@/src/components/homepage/homepage-surchauffe-urbaine";
import { HomepageNewsletter } from "@/src/components/homepage/homepage-newsletter";
import { HomepageLinkedin } from "@/src/components/homepage/homepage-linkedin";
import { Separator } from "@/src/components/common/separator";
import { HomepageCitations } from "@/src/components/homepage/homepage-citations";
import Image from "next/image";

export const Homepage = () => {
  return (
    <div>
      <Image
        src="/images/homepage/wave-bg-left.svg"
        alt=""
        width={300}
        height={500}
        className="absolute left-0 top-[17rem] -z-50 hidden max-w-[50%] md:block lg:top-[30rem]"
      />
      <Image
        src="/images/homepage/wave-bg-right.svg"
        alt=""
        width={500}
        height={500}
        className="absolute right-0 top-[52rem] -z-50 hidden md:block"
      />
      <HomepageIntro />
      <HomepageIdeeAction />
      <HomepageCitations />
      <HomepageInspirer />
      <HomepageSurchauffeUrbaine />
      <HomepageNewsletter />
      <HomepageLinkedin />
      <Separator />
      <HomepageOdd />
    </div>
  );
};
