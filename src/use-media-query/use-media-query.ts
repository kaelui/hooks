import { useEffect, useRef, useState } from "react";
import { isBrowser } from "#util/isBrowser";

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

function attachMediaListener(
  query: MediaQueryList,
  callback: MediaQueryCallback
) {
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }

  if (isBrowser && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export function useMediaQuery(
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  }
) {
  const [matches, setMatches] = useState(
    getInitialValueInEffect
      ? initialValue
      : getInitialValue(query, initialValue)
  );
  const queryRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (!("matchMedia" in window)) return;

    queryRef.current = window.matchMedia(query);
    setMatches(queryRef.current.matches);
    return attachMediaListener(queryRef.current, (event) =>
      setMatches(event.matches)
    );
  }, [query]);

  return matches;
}
