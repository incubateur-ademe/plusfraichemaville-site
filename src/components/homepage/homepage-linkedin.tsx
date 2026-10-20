import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import Image from "next/image";

export const HomepageLinkedin = () => (
  <section>
    <div className="fr-container fr-py-4w flex flex-col items-center justify-between gap-6 md:flex-row">
      <div>
        <div className="fr-h4 !mb-2 flex">
          Suivez Plus fraîche ma ville sur Linkedin
          <Image src="/images/linkedin.svg" alt="" width={20} height={20} className="float-right ml-3" />
        </div>
        <div>Rejoignez la communauté et suivez nos actualités</div>
      </div>
      <div className="w-full md:w-fit">
        <LinkWithoutPrefetch
          className="fr-btn w-full justify-center md:w-fit"
          target="_blank"
          href="https://www.linkedin.com/groups/13150515/"
        >
          Nous suivre
        </LinkWithoutPrefetch>
      </div>
    </div>
  </section>
);
