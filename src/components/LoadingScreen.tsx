"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[var(--bg-dark)] flex flex-col items-center justify-center"
        >
          {/* Logo animada */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 rounded-full bg-[var(--penha-red)] flex items-center justify-center border-2 border-[var(--penha-cream)]/20 mb-8"
          >
            <span className="font-slab text-[var(--penha-cream)] text-3xl font-bold">TP</span>
          </motion.div>

          {/* Texto */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-slab text-[var(--penha-cream)]/70 text-lg italic"
          >
            A Tia já está preparando…
          </motion.p>

          {/* Barra de carregamento */}
          <motion.div
            className="mt-6 w-48 h-1 bg-[var(--penha-cream)]/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[var(--penha-red)] via-[var(--penha-gold)] to-[var(--penha-red)] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
