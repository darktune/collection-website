"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 second delay before hiding
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-brand-white dark:bg-brand-black flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <img 
              src="/media/logo_transparent.png" 
              alt="Abraham Collection Logo" 
              className="h-24 md:h-32 w-auto mb-8 dark:brightness-0 dark:invert transition-all duration-300"
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xs tracking-[0.3em] uppercase font-medium text-brand-burgundy"
            >
              Clothing That Suits
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
