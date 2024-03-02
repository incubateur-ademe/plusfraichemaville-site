import React from "react";
import ButtonSaveFicheSolution from "@/components/ficheSolution/ButtonSaveFicheSolution";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import { APIResponseData } from "@/lib/strapi/types/types";
import { FicheSolution } from "./type";

export default function FicheSolutionCardWithUserInfo({
  ficheSolution,
  projectName,
  extraUrlParams,
  className,
}: {
  ficheSolution: APIResponseData<"api::fiche-solution.fiche-solution">;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`relative flex ${className}`}>
      <FicheSolutionFullCard ficheSolution={ficheSolution.attributes} extraUrlParams={extraUrlParams} />
      <ButtonSaveFicheSolution
        ficheSolutionId={ficheSolution.id}
        label={false}
        projectName={projectName}
        className={"flex justify-center items-center absolute top-2 right-2"}
      />
    </div>
  );
}

// TESTING PURPOSE
export const fiche: FicheSolution = {
  titre: "Jardins potagers, vergers dans la cour d'école",
  type_solution: "verte",
  description_courte: "Rafraîchit l'air par l'évapotranspiration et la création d'ombrage",
  image_principale: {
    data: {
      // @ts-expect-error
      attributes: {
        url: "https://plusfraichemaville.s3.fr-par.scw.cloud/fiche_solution_potagers_ecole_header_a0097fc954.jpg",
        formats: {
          small: {
            ext: ".jpg",
            // eslint-disable-next-line max-len
            url: "https://plusfraichemaville.s3.fr-par.scw.cloud/small_fiche_solution_potagers_ecole_header_a0097fc954.jpg",
            hash: "small_fiche_solution_potagers_ecole_header_a0097fc954",
            mime: "image/jpeg",
            name: "small_fiche-solution-potagers-ecole-header.jpg",
            path: null,
            size: 16.95,
            width: 300,
            height: 180,
          },
          medium: {
            ext: ".jpg",
            // eslint-disable-next-line max-len
            url: "https://plusfraichemaville.s3.fr-par.scw.cloud/medium_fiche_solution_potagers_ecole_header_a0097fc954.jpg",
            hash: "medium_fiche_solution_potagers_ecole_header_a0097fc954",
            mime: "image/jpeg",
            name: "medium_fiche-solution-potagers-ecole-header.jpg",
            path: null,
            size: 54.29,
            width: 650,
            height: 390,
          },
          thumbnail: {
            ext: ".jpg",
            // eslint-disable-next-line max-len
            url: "https://plusfraichemaville.s3.fr-par.scw.cloud/thumbnail_fiche_solution_potagers_ecole_header_a0097fc954.jpg",
            hash: "thumbnail_fiche_solution_potagers_ecole_header_a0097fc954",
            mime: "image/jpeg",
            name: "thumbnail_fiche-solution-potagers-ecole-header.jpg",
            path: null,
            size: 12.46,
            width: 245,
            height: 147,
          },
        },
      },
    },
  },
  cout_minimum: 100,
  cout_maximum: 150,
  baisse_temperature: 0.3,
  portee_baisse_temperature: "air",
  libelle_avantage_solution: undefined,
  delai_travaux_minimum: 0,
  delai_travaux_maximum: 1,
  types_espace: ["ecole"],
  slug: "potagers-ecole",
};
