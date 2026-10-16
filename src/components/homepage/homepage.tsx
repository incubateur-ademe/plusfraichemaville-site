import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { NewsletterLinkedin } from "@/src/components/common/newsletter-linkedin";
import { HomepageIntro } from "@/src/components/homepage/homepage-intro";
import { HomepageIdeeAction } from "@/src/components/homepage/homepage-idee-action";

export const Homepage = () => {
  return (
    <div>
      <HomepageIntro />
      <HomepageIdeeAction />
      <HomepageInspirer />
      <NewsletterLinkedin />
      <HomepageOdd />
    </div>
  );
};
