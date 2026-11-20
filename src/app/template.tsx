"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// First load needs no transition; only client-side navigations get a soft fade.
const nav = { done: false };

/** Subtle enter-only page transition (client feedback: keep animations light). */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => nav.done && !reduce);
  useEffect(() => {
    nav.done = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
