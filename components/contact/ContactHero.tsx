"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Home, ChevronRight, Mail } from "lucide-react";

export default function ContactHero() {
  // Initialize translations
  const t = useTranslations("contact");

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
    <section
      ref={heroRef}
      className="py-24 lg:py-32 relative bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-gray-950"
    >
      {/* Background decorations */}
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
            {t("breadcrumbs.contact")}
          </span>
        </motion.div>

        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              heroInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5 }}
            className="bg-primary/10 dark:bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Mail className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {/* Contact quick info */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-12"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <a
                href="mailto:info@charity.org"
                className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
              >
                info@charity.org
              </a>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                </svg>
              </div>
              <a
                href="tel:+20123456789"
                className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
              >
                +20 123 456 789
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
