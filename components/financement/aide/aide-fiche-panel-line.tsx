import Image from "next/image";

type AideFichePanelLineProps = {
  title: string;
  description: string;
  picto: string;
};
export const AideFichePanelLine = ({ title, description, picto }: AideFichePanelLineProps) => {
  return (
    <div className="mb-8 flex items-start gap-[10px]">
      <Image src={`/images/financement/${picto}.svg`} width={16} height={16} alt="" className="block pt-1" />
      <div>
        <span className="text-base font-bold">{title}</span>
        <p className="mb-0">{description}</p>
      </div>
    </div>
  );
};
