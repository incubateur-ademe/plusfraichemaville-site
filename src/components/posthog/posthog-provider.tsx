"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { useConsent } from "@/src/components/cookie/consentManagement";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { finalityConsent } = useConsent();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        ui_host: "https://eu.posthog.com",
        persistence: finalityConsent?.posthog || finalityConsent?.isFullConsent ? "localStorage+cookie" : "memory",
        capture_pageview: false,
        capture_pageleave: true,
      });
    }
    const handleSurveyCompleted = (event: Event) => {
      const surveyId = (event as CustomEvent).detail?.surveyId;
      if (surveyId) {
        sessionStorage.setItem(`survey_answered_${surveyId}`, "true");
      }
    };

    window.addEventListener("ph-survey-completed", handleSurveyCompleted);
    return () => {
      window.removeEventListener("ph-survey-completed", handleSurveyCompleted);
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
