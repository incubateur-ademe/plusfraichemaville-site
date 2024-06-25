import { formatISODateToFullDate } from "@/helpers/common";
import Image from "next/image";

type AideFichePanelLineProps = {
  title: string;
  description?: string[] | string | null;
  picto: string;
  date?: string | null;
};
export const AideFichePanelLine = ({ title, description, date, picto }: AideFichePanelLineProps) => {
  const desc = typeof description === "string" ? description : description?.filter(Boolean).join(", ");

  return (
    <div className="mb-8 flex items-start gap-[10px]">
      <Image src={`/images/financement/${picto}.svg`} width={16} height={16} alt="" className="block shrink-0 pt-1" />
      <div>
        <span className="text-base font-bold">{title}</span>
        {description && <p className="mb-0">{desc}</p>}
        {date && <p className="mb-0">{formatISODateToFullDate(date)}</p>}
      </div>
    </div>
  );
};
