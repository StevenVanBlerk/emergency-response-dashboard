"use client";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const useWindowDimensions = () => {
  const initialDimensions = { width: null, height: null };
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>(initialDimensions);

  const invalidateWindowDimensions = useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  useEffect(() => {
    invalidateWindowDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      debounce(invalidateWindowDimensions, 250),
    ); //debouncing to delay rerender till the user has stopped resizing
    return () =>
      window.removeEventListener("resize", invalidateWindowDimensions);
  }, [invalidateWindowDimensions]);

  const getWindowDimensions = () => {
    return { width: window.innerWidth, height: window.innerHeight };
  };

  // returning placeholder values until hook is fully initialised
  const hasWindow = typeof window !== "undefined";
  if (!hasWindow) {
    return {
      windowDimensions: initialDimensions,
      invalidateWindowDimensions: () => {},
    };
  }

  const screenType =
    windowDimensions.width === null
      ? null
      : windowDimensions.width < 600
        ? "MOBILE"
        : windowDimensions.width < 1100
          ? "TABLET"
          : "DESKTOP";

  return { windowDimensions, invalidateWindowDimensions, screenType };
};

export default useWindowDimensions;
