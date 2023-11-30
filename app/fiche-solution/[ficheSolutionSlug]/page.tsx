import Image from "next/image";
import { getDirectusImageUrl } from "@/lib/directus/directusClient";
import { notFound } from "next/navigation";
import { getFicheSolutionBySlug } from "@/lib/directus/queries/fichesSolutionsQueries";

export default async function FicheSolution({ params }: { params: { ficheSolutionSlug: string } }) {
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  if (ficheSolution) {
    return (
      <>
        <Image
          width={1200}
          height={500}
          className="w-full max-h-64 object-cover"
          src={getDirectusImageUrl(ficheSolution.image_principale)}
          alt={ficheSolution?.titre || "image titre"}
        />
        <h1 className={"mt-8"}>{ficheSolution.titre}</h1>
        <div className="cmsRichText" dangerouslySetInnerHTML={{ __html: ficheSolution.description_courte || "" }}></div>
      </>
    );
  } else {
    notFound();
  }
}
