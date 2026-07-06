"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function useReveal({
  threshold = 0.15,
  rootMargin = "100px",
  triggerOnce = true,
} = {}) {
  const [hasEntered, setHasEntered] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && !hasEntered) {
      setHasEntered(true);
    }
  }, [inView, hasEntered]);

  return {
    ref,
    inView,
    hasEntered,
  };
}
