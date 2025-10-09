import { HomepageHero } from "./homepage-hero";
import { HomepageStart } from "./homepage-start";
import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { HomepageProjet } from "@/src/components/homepage/homepage-projet";
import { HomepageStories } from "@/src/components/homepage/homepage-stories";
import { NewsletterLinkedin } from "@/src/components/common/newsletter-linkedin";
import BannerProjet from "@/src/components/espace-projet/banner/banner-projet";

export const Homepage = () => {
  return (
    <div>
      <BannerProjet/>
      <HomepageHero />
      <HomepageProjet />
      <HomepageStories />
      <HomepageStart />
      <HomepageInspirer />
      <NewsletterLinkedin />
      <HomepageOdd />
    </div>
  );
};
