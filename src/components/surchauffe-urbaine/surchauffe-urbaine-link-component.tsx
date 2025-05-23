import { PFMV_ROUTES } from "@/src/helpers/routes";
import { SurchauffeUrbaineLinkItem } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-link-item";

export const SurchauffeUrbaineLinkComponent = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="pfmv-strong-card mx-8 flex w-fit flex-col gap-10 px-4 py-2 md:flex-row">
        <SurchauffeUrbaineLinkItem
          linkText="Comprendre les notions clés"
          linkUrl={PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE}
          pictoUrl="/images/surchauffe-urbaine/surchauffe-menu-comprendre.svg"
        />
        <SurchauffeUrbaineLinkItem
          linkText="Pourquoi et quand faire un diagnostic"
          linkUrl={PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING}
          pictoUrl="/images/surchauffe-urbaine/surchauffe-menu-quand.svg"
        />
        <SurchauffeUrbaineLinkItem
          linkText="Diagnostics réalisés par les collectivités"
          linkUrl={PFMV_ROUTES.SURCHAUFFE_URBAINE_REX}
          pictoUrl="/images/surchauffe-urbaine/surchauffe-menu-rex.svg"
        />
      </div>
    </div>
  );
};
