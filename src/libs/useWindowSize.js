"use client";
import debounce from "just-debounce-it";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });
  useEffect(() => {
    const onWindowResize = debounce(
      () => {
        setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      },
      500,
      true,
    );
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);
  return windowSize;
};
