"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactMap() {
  // Initialize translations
  const t = useTranslations("contact");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("map.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("map.description")}
          </p>
        </motion.div>

        {/* Map container (would be replaced with actual map integration) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative h-[500px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <MapPin className="h-16 w-16 text-primary/60" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-primary/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-4 border-primary/60 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('/images/map-grid.png')] bg-repeat opacity-10"></div>

          {/* Location card */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm">
            <h3 className="text-xl font-bold mb-4">
              {t("info.address.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("info.address.street")}
              <br />
              {t("info.address.city")}
              <br />
              {t("info.address.country")}
            </p>
            <div className="flex gap-3">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                {t("map.getDirections")}
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {t("map.viewLarger")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
