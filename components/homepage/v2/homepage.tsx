import { HomepageHero } from "./homepage-hero";
import { HomepageInspirer } from "./homepage-inspirer";
import { HomepageNewsletter } from "./homepage-newsletter";
import { HomepageProjet } from "./homepage-projet";
import { HomepageStart } from "./homepage-start";
import { HomepageStories } from "./homepage-stories";

export const HomepageV2 = () => {
  return (
    <div>
      <HomepageHero />
      <HomepageProjet />
      <HomepageStories />
      <HomepageStart />
      <HomepageInspirer />
      <HomepageNewsletter />
    </div>
  );
};
