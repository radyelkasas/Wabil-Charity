"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  // Initialize translations
  const t = useTranslations("contact");

  // Form submission state
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Handle form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormStatus("success");

    // Reset form after success
    setTimeout(() => {
      setFormStatus("idle");
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
        <h3 className="text-2xl font-bold mb-6">{t("form.title")}</h3>

        {formStatus === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              {t("form.successTitle")}
            </h4>
            <p className="text-green-700 dark:text-green-400">
              {t("form.successMessage")}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.name")}
                </label>
                <Input id="name" name="name" required className="w-full" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                {t("form.subject")}
              </label>
              <Input id="subject" name="subject" required className="w-full" />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t("form.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={formStatus === "sending"}
              className="bg-primary hover:bg-primary/90 w-full"
            >
              {formStatus === "sending" ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-r-transparent rounded-full"></span>
                  {t("form.sending")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t("form.submit")}
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
