import { TableauDeBord } from "@/src/components/tableau-de-bord";
import BannerProjet from "@/src/components/espace-projet/banner/banner-projet";
import React from "react";

export default function TableauDeBordPage() {
  return (
    <>
      <BannerProjet />
      <TableauDeBord />
    </>
  );
}
