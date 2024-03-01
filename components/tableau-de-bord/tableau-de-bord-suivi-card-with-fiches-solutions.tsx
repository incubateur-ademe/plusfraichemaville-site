import Image from "next/image";

export const TableauDeBordSuiviWithFichesSolutions = () => {
  return (
    <div className="absolute bottom-0 left-0 w-10 h-10 rounded-[50%] overflow-hidden">
      <Image
        className="w-10 h-10"
        src="/images/homepage/rex-home-cour-oasis-berthelot-montrouge.jpg"
        alt="image"
        width={48}
        height={48}
      />
    </div>
  );
};
