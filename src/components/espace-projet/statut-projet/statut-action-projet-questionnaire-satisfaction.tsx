"use client";
import Script from "next/script";
import { useEffect } from "react";

export const StatutActionProjetQuestionnaireSatisfaction = () => {
  useEffect(() => {
    // @ts-expect-error TS2304: Cannot find name Tally
    if (typeof window.Tally !== "undefined") {
      // @ts-expect-error TS2304: Cannot find name Tally
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <>
      <iframe
        data-tally-src="https://tally.so/embed/BzDQ17?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="2996"
        title="Questionnaire de satisfaction - Plus fraîche ma ville"
        className="border-2 border-solid border-dsfr-background-default-grey-hover"
      ></iframe>
      {/*// @ts-expect-error TS2304: Cannot find name Tally*/}
      <Script src="https://tally.so/widgets/embed.js" onLoad={() => Tally.loadEmbeds()} />
    </>
  );
};
