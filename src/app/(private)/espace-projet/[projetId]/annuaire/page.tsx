import { Annuaire } from "@/src/components/annuaire/annuaire";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import React from "react";
import { BREADCRUMB_ANNUAIRE_MES_CONTACTS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-annuaire";

const AnnuairePage = () => {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_ANNUAIRE_MES_CONTACTS} />
      <Annuaire />
    </>
  );
};

export default AnnuairePage;
