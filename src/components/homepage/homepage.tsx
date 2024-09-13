import { HomepageHero } from "./homepage-hero";
import { HomepageStart } from "./homepage-start";
import { HomepageNewsletter } from "./homepage-newsletter";
import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { HomepageProjet } from "@/src/components/homepage/homepage-projet";
import { HomepageStories } from "@/src/components/homepage/homepage-stories";

export const Homepage = () => {
  return (
    <div>
      <HomepageHero />
      <HomepageProjet />
      <HomepageStories />
      <HomepageStart />
      <HomepageInspirer />
      <HomepageNewsletter />
      <HomepageOdd />
    </div>
  );
};
