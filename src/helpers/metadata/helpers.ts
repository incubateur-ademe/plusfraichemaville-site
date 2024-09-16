import { Metadata } from "next";

export const computeMetadata = (title: string, description?: string, imageUrl?: string): Metadata => {
  return {
    title: `${title} | Plus fraîche ma ville`,
    description: description || defaultMetadataDescription,
    openGraph: {
      type: "website",
      title: `Plus fraîche ma ville | ${title}`,
      images: imageUrl || defaultMetadataImage,
      description: description || defaultMetadataDescription,
    },
  };
};

export const defaultMetadataDescription =
  "Le service numérique dédié aux agents et aux élus qui rafraîchissent durablement leur collectivité.";

export const defaultMetadataImage = "/favicon/apple-touch-icon.png";
