import { HomepageHero } from "./homepage-hero";
import { HomepageInspirer } from "./homepage-inspirer";
import { HomepageProjet } from "./homepage-projet";
import { HomepageStart } from "./homepage-start";
import { HomepageStories } from "./homepage-stories";
import { HomepageNewsletter } from "./homepage-newsletter";
import { HomepageOdd } from "@/components/homepage/homepage-odd";

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
