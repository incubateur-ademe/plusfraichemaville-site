import { useState } from "react";
import { Climadiag } from "./types";
import dynamic from "next/dynamic";

type ClimadiagDownloaderProps = {
  data: Climadiag;
};

const LazyClimadiagViewer = dynamic(() => import("./climadiag-viewer").then((mod) => mod.ClimadiagViewer));

export const ClimadiagDownloader = ({ data }: ClimadiagDownloaderProps) => {
  const [viewer, setViewer] = useState(false);
  const download = () => setViewer(true);
  const close = () => setViewer(false);

  return (
    <>
      <button
        onClick={download}
        className="flex items-center text-base font-bold pl-2 mt-4 !hover:bg-transparent hover:underline"
      >
        Télécharger la synthèse
        <svg className="ml-2" width="13" height="14" viewBox="0 0 13 14" fill="none">
          <g>
            <path
              // eslint-disable-next-line max-len
              d="M7.22234 7.79579V0.736842C7.22234 0.324211 6.90457 0 6.50012 0C6.09568 0 5.7779 0.324211 5.7779 0.736842V7.79579L3.39457 5.36421C3.10568 5.06947 2.6579 5.06947 2.36901 5.36421C2.08012 5.65895 2.08012 6.11579 2.36901 6.41053L6.48568 10.6105L10.6023 6.41053C10.8912 6.11579 10.8912 5.65895 10.6023 5.36421C10.3135 5.06947 9.86568 5.06947 9.57679 5.36421L7.19346 7.79579H7.22234Z"
              fill="#000091"
            />
            <path
              // eslint-disable-next-line max-len
              d="M0.722222 9.57812C1.12667 9.57812 1.44444 9.90234 1.44444 10.315V11.4939C1.44444 12.0687 1.89222 12.5255 2.45556 12.5255H10.5444C11.1078 12.5255 11.5556 12.0687 11.5556 11.4939V10.315C11.5556 9.90234 11.8733 9.57812 12.2778 9.57812C12.6822 9.57812 13 9.90234 13 10.315V11.4939C13 12.8792 11.9022 13.9992 10.5444 13.9992H2.45556C1.09778 13.9992 0 12.8792 0 11.4939V10.315C0 9.90234 0.317778 9.57812 0.722222 9.57812Z"
              fill="#000091"
            />
          </g>
          <defs>
            <clipPath>
              <rect width="13" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      {viewer && <LazyClimadiagViewer data={data} close={close} />}
    </>
  );
};
