import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { HomepageIntro } from "@/src/components/homepage/homepage-intro";
import { HomepageIdeeAction } from "@/src/components/homepage/homepage-idee-action";
import { HomepageSurchauffeUrbaine } from "@/src/components/homepage/homepage-surchauffe-urbaine";
import { HomepageNewsletter } from "@/src/components/homepage/homepage-newsletter";
import { HomepageLinkedin } from "@/src/components/homepage/homepage-linkedin";
import { Separator } from "@/src/components/common/separator";

export const Homepage = () => {
  return (
    <div>
      <HomepageIntro />
      <HomepageIdeeAction />
      <HomepageInspirer />
      <HomepageSurchauffeUrbaine />
      <HomepageNewsletter />
      <HomepageLinkedin/>
      <Separator/>
      <HomepageOdd />
    </div>
  );
};
