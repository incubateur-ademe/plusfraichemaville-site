import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";

export const useApi = <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(input, init);
        const res = await response.json();
        if (response.ok) {
          setData(res);
          setError(null);
        } else {
          setError(res);
          setData(null);
        }
      } catch (err) {
        Sentry.captureException(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [input, init]);
  return { data, error, loading };
};
