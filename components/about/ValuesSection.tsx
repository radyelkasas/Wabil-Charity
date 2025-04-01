"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Heart, Users, Target } from "lucide-react";

// Define the ValueCard type
interface ValueCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// Props interface
interface ValuesSectionProps {
  values: ValueCard[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  // Initialize translations
  const t = useTranslations("about");

  // Reference for animation trigger
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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

  // Helper function to render the correct icon based on string name
  const renderIcon = (iconName: string, size = 32) => {
    switch (iconName) {
      case "CheckCircle2":
        return <CheckCircle2 size={size} />;
      case "Heart":
        return <Heart size={size} />;
      case "Users":
        return <Users size={size} />;
      case "Target":
        return <Target size={size} />;
      default:
        return <CheckCircle2 size={size} />;
    }
  };

  return (
    <section ref={valuesRef} className="py-16 lg:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("values.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("values.description")}
          </p>
        </motion.div>

        {/* Values grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.id}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 ${value.color}`}
              >
                {renderIcon(value.icon)}
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
