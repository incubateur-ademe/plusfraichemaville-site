import { HomepageHero } from "./homepage-hero";
import { HomepageStart } from "./homepage-start";
import { HomepageOdd } from "@/src/components/homepage/homepage-odd";
import { HomepageInspirer } from "@/src/components/homepage/homepage-inspirer";
import { NewsletterLinkedin } from "@/src/components/common/newsletter-linkedin";
import { PresentationServices } from "@/src/components/homepage/presentation-services";

export const Homepage = () => {
  return (
    <div>
      <HomepageHero />
      <PresentationServices className="bg-dsfr-background-alt-blue-france pb-11 pt-8" />
      <HomepageInspirer />
      <HomepageStart />
      <NewsletterLinkedin />
      <HomepageOdd />
    </div>
  );
};
