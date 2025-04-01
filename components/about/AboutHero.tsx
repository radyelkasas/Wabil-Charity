"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Home, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutHero() {
  // Initialize translations
  const t = useTranslations("about");

  // Reference for animation trigger
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

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
    <section ref={heroRef} className="py-16 lg:py-24 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 z-0"></div>
      <div className="absolute top-16 right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-10 gap-2"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            <Home className="h-4 w-4 inline-block mx-1" />
            {t("breadcrumbs.home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-100">
            {t("breadcrumbs.about")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t("hero.donateButton")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {t("hero.learnMoreButton")}
              </Button>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              heroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative h-80 lg:h-[450px] rounded-xl overflow-hidden">
              {/* Placeholder for image - would be replaced with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"></div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-20"></div>
              <div className="absolute top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-[250px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="font-bold">{t("hero.card.title")}</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t("hero.card.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
