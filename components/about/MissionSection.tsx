"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";

export default function MissionSection() {
  // Initialize translations
  const t = useTranslations("about");

  // Reference for animation trigger
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={missionRef}
      className="py-16 lg:py-24 bg-gray-50 dark:bg-primary-foreground"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("mission.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("mission.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/media/mission.jpg"
                alt={t("mission.title")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={
                missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="font-bold">{t("mission.card.title")}</p>
              </div>
              <p className="text-4xl font-bold text-primary">
                {t("mission.card.value")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("mission.card.description")}
              </p>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              {t("mission.vision.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("mission.vision.description")}
            </p>

            <h3 className="text-2xl font-bold mb-6">
              {t("mission.goals.title")}
            </h3>
            <ul className="space-y-4">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full mt-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(`mission.goals.goal${i}`)}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
