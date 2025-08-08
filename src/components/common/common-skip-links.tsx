import SkipLinks from "@codegouvfr/react-dsfr/SkipLinks";

export const CommonSkipLinks = () => {
  return (
    <SkipLinks
      links={[
        {
          anchor: "#contenu",
          label: "Contenu",
        },
        {
          anchor: "#header-navigation",
          label: "Menu",
        },
        {
          anchor: "#footer",
          label: "Pied de page",
        },
      ]}
    />
  );
};
