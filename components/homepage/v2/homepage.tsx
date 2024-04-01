import { HomepageHero } from "./homepage-hero";
import { HomepageInspirer } from "./homepage-inspirer";
import { HomepageProjet } from "./homepage-projet";
import { HomepageRedirect } from "./homepage-redirect";
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
      <HomepageRedirect />
    </div>
  );
};
