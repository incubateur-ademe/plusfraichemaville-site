import { ProjectionsIndicateurClimadiag } from "@/lib/prisma/prismaCustomTypes";
import { ClimadiagYear } from "./types";
import clsx from "clsx";

type ClimadiagIndicateursTabButtonProps = {
  active: boolean;
  year: ClimadiagYear;
  changeTab?: (_year: keyof ProjectionsIndicateurClimadiag) => void;
};

export const ClimadiagIndicateursTabButton = ({ active, year, changeTab }: ClimadiagIndicateursTabButtonProps) => {
  const temperature = year === 2030 ? 2 : year === 2050 ? 2.7 : 4;
  return (
    <button
      className={clsx(
        "relative mr-3 rounded-3xl px-4 py-1 text-xl",
        active
          ? "pointer-events-none bg-dsfr-text-label-blue-france pr-16 font-bold text-white"
          : "bg-dsfr-background-action-low-blue-france-hover",
        "hover:!bg-dsfr-background-action-low-blue-france-active",
      )}
      onClick={() => changeTab && changeTab(year)}
    >
      {year}
      {active && (
        <div className="absolute -top-[6px] right-0 w-[48px]">
          <span className={clsx("absolute top-[10.5px] text-[9.5px]", year === 2050 ? "left-[16px]" : "left-[19px]")}>
            +{temperature}°C
          </span>
          <svg viewBox="0 0 50 50">
            <rect width="50" height="50" fill="var(--border-default-blue-france)" rx="25" ry="25"></rect>
            <path
              fill="none"
              stroke="#fff"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.4"
              // eslint-disable-next-line max-len
              d="M40.431 32.771V33c-.075.232-.15.47-.226.693-.143.423-.04.748.315 1.059.703.54 1.407 1.08 2.027 1.625.615.462.638.874-.002 1.408-1.127.81-2.25 1.703-3.377 2.514a2 2 0 01-1.658.344 146 146 0 00-5.781-1.243c-.596-.131-1.18-.098-1.747.266-.482.36-1.053.64-1.54.916-.488.277-.72.622-.69 1.117.02.33-.045.666-.025.996-.045.666-.37.85-1.05.723-1.702-.4-3.482-.712-5.185-1.111-1.279-.341-2.524-.104-3.789-.198-.507-.053-1.014-.106-1.447-.33-1.294-.588-2.508-1.264-3.807-1.935-.777-.37-.88-.695-.678-1.535.68-2.69 1.365-5.3 2.13-7.995.133-.587.183-1.17-.102-1.734-1.14-2.254-2.197-4.514-3.254-6.773-.197-.486-.546-.715-1.063-.934L5.38 19.617c-.684-.21-1.127-.596-1.338-1.33-.113-.49-.309-.978-.422-1.469-.211-.733-.058-.99.69-1.115.502-.029 1.164-.15 2.08-.285 1.58-.256 3.106-.014 4.818.55.517.22 1.111.353 1.623.489.428.141.59.047.477-.443a508 508 0 00-.436-3.123c-.132-.821.109-1.001.965-.72 1.028.356 2.145.79 3.178 1.227.6.215 1.02.19 1.586-.173 1.206-.898 2.499-1.718 3.705-2.616.482-.359.792-.79.925-1.379.129-.67.253-1.422.465-2.097.133-.588.457-.773 1.037-.889q.342-.081.66-.086c.637-.01 1.217.207 1.807.608 2.194 1.614 4.466 3.14 6.576 4.76.876.612 1.731.896 2.819.833.92-.052 1.684.068 2.318.86s1.642.817 2.572.93c.168-.01.34.063.424.058.68.127.866.448.817 1.031-.122.94-.328 1.845-.471 2.762v.116"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
};
