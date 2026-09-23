"use client";

import { motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/utils";

/** Remounts on every navigation, so each page gets a soft entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_EXPO }}>
      {children}
    </motion.div>
  );
}
