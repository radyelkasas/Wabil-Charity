"use client";

import React from "react";
import { motion } from "framer-motion";

const PageLoadingIndicator: React.FC = () => {
  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotsVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0.2 },
    animate: {
      y: [-5, 0, -5],
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* مؤشر التحميل المتحرك */}
        <div className="relative">
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 rounded-full bg-primary opacity-20"
          />

          <motion.div
            variants={spinnerVariants}
            initial="initial"
            animate="animate"
            className="h-20 w-20 border-4 border-primary border-r-transparent rounded-full"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={dotsVariants}
              initial="initial"
              animate="animate"
              className="flex space-x-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={dotVariants}
                  className="h-2 w-2 bg-primary rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </div>

        <p className="mt-6 text-primary font-medium text-lg">
      
        </p>
      </div>
    </div>
  );
};

export default PageLoadingIndicator;
