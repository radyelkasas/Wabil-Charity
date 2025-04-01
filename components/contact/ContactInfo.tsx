"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactInfo() {
  // Initialize translations
  const t = useTranslations("contact");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg ms-auto rtl:justify-end ltr:justify-start">
          <TabsTrigger value="info">{t("tabs.info")}</TabsTrigger>
          <TabsTrigger value="location">{t("tabs.location")}</TabsTrigger>
          <TabsTrigger value="hours">{t("tabs.hours")}</TabsTrigger>
        </TabsList>

        <TabsContent
          value="info"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[400px]"
        >
          <div className="space-y-6">
            <div className="flex items-start justify-end gap-12">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t("info.email.title")}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  {t("info.email.description")}
                </p>
                <a
                  href="mailto:info@charity.org"
                  className="text-primary hover:underline"
                >
                  info@charity.org
                </a>
              </div>
            </div>

            <div className="flex items-start justify-end gap-12">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t("info.phone.title")}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  {t("info.phone.description")}
                </p>
                <a
                  href="tel:+20123456789"
                  className="text-primary hover:underline"
                >
                  +20 123 456 789
                </a>
              </div>
            </div>

            <div className="flex items-start justify-end gap-12">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t("info.address.title")}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("info.address.street")}
                  <br />
                  {t("info.address.city")}
                  <br />
                  {t("info.address.country")}
                </p>
              </div>
            </div>

            {/* Social media icons */}
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-bold mb-4">{t("info.social.title")}</h4>
              <div className="flex gap-4">
                {["facebook", "twitter", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      {social === "facebook" ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.162 21.757v-8.457H6.39v-3.243h2.772V7.193c0-2.726 1.667-4.211 4.101-4.211 1.166 0 2.167.087 2.46.126v2.852h-1.689c-1.323 0-1.578.629-1.578 1.552v2.036h3.155l-.411 3.243H12.46v8.457H9.162z" />
                        </svg>
                      ) : social === "twitter" ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      ) : social === "instagram" ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      )}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="location"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[400px]"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">{t("location.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("location.description")}
            </p>
          </div>

          {/* Map placeholder - would be replaced with actual map */}
          <div className="relative h-[300px] w-full bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-primary/60" />
              <div className="absolute w-24 h-24 border-4 border-primary/30 rounded-full"></div>
              <div className="absolute w-16 h-16 border-4 border-primary/60 rounded-full animate-ping"></div>
            </div>

            {/* Map decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('/images/about/map-pattern.png')] bg-repeat"></div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold mb-1">{t("info.address.title")}</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("info.address.street")}
                <br />
                {t("info.address.city")}
                <br />
                {t("info.address.country")}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {t("location.directions")}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="hours"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[400px]"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">{t("hours.title")}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("hours.description")}
            </p>
          </div>

          <div className="space-y-5">
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((day) => (
              <div
                key={day}
                className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      day === "friday" || day === "saturday"
                        ? "bg-gray-300 dark:bg-gray-600"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span className="font-medium capitalize">
                    {t(`hours.days.${day}`)}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {day === "friday" || day === "saturday"
                    ? t("hours.closed")
                    : t("hours.workingHours")}
                </span>
              </div>
            ))}
          </div>

          {/* Decoration */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t("hours.note")}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
