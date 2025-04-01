"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Define the Stats type
interface Stat {
  id: string;
  value: number;
  label: string;
}

// Props interface
interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {

  // Reference for animation trigger
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={statsRef}
      className="py-20 bg-primary dark:bg-primary/30 text-white relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/about/pattern.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative">
        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                {/* Format number appropriately */}
                {stat.value >= 1000
                  ? `${(stat.value / 1000).toFixed(0)}K+`
                  : `${stat.value}+`}
              </h3>
              <p className="text-lg text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
