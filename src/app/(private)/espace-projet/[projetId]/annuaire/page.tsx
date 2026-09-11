import { Annuaire } from "@/src/components/annuaire/annuaire";
import { BREADCRUMB_ANNUAIRE_CARTE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-annuaire";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { ProtectedAgentPublicUrl } from "@/src/components/common/protected-agent-public-url";

export const metadata: Metadata = computeMetadata("Carte des projets et des contacts");

const AnnuairePage = async (props: { params: Promise<{ projetId: string }> }) => {
  const params = await props.params;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_ANNUAIRE_CARTE} />
      <ProtectedAgentPublicUrl>
        <Annuaire projetId={params.projetId} />
      </ProtectedAgentPublicUrl>
    </>
  );
};
export default AnnuairePage;
