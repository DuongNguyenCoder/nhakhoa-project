"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

export default function Reveal({
  children,
  className = "",
  threshold,
  rootMargin,
  triggerOnce = true,
  y = 20,
  duration = 0.4,
}) {
  const { ref, hasEntered } = useReveal({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div ref={ref} className={className}>
      {hasEntered && (
        <motion.div
          initial={{
            opacity: 0,
            y,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
