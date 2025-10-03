import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { NewsletterIframe } from "@/src/forms/newsletter/newsletter-iframe";

export const NewsletterLinkedin = () => (
  <div>
    <div className="fr-follow rounded-3xl !py-6">
      <div className="fr-container">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-6 !pr-[4%]">
            <NewsletterIframe />
          </div>
          <div className="fr-col-12 fr-col-md-6 !pl-[4%]">
            <div className="!justify-start">
              <h2 className="!text-[1.375rem]">
                Suivez-nous sur LinkedIn{" "}
                <Image src="/images/linkedin.svg" alt="" width={24} height={24} className="float-right ml-2" />
              </h2>
              <p className="mb-10">
                {"Rejoignez la communauté, suivez-nous et commenter nos posts sur notre groupe LinkedIn :"}
              </p>
              <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4">
                <div className="flex flex-row items-center text-sm font-bold">
                  <Image src="/images/logo-pfmv-seul.svg" alt="" width={36} height={36} className="float-left mr-1" />
                  Plus fraîche ma ville ADEME
                </div>
                <LinkWithoutPrefetch
                  className="fr-btn rounded-3xl"
                  target="_blank"
                  href="https://www.linkedin.com/groups/13150515/"
                >
                  Nous suivre
                </LinkWithoutPrefetch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
