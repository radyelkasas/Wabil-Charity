"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Facebook, Youtube, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const t = useTranslations("footer");
  const [year, setYear] = useState<number>(2024);

  // Update year to current year on client side
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Social media links
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={20} className="text-blue-600" />,
      url: "#",
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} className="text-green-500" />,
      url: "#",
      ariaLabel: "Contact us on WhatsApp",
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} className="text-red-600" />,
      url: "#",
      ariaLabel: "Subscribe to our YouTube channel",
    },
  ];

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

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer
      className="relative inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat z-0"
      style={{
        backgroundImage: "url(/media/footer.webp)",
        minHeight: "300px",
      }}
    >
      {/* Footer content */}
      <motion.div
        className="container z-10 mx-auto px-4 py-8 absolute bottom-6 left-0 right-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Social media icons */}
        <motion.div
          className="flex justify-center items-center gap-6 mb-6"
          variants={itemVariants}
        >
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              aria-label={social.ariaLabel}
              className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {social.icon}
            </Link>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-200 my-4 max-w-4xl mx-auto"
        />

        {/* Copyright and ID */}
        <motion.div
          className="text-center text-gray-600 text-sm"
          variants={itemVariants}
        >
          <p>
            {t("all_rights_reserved")} {t("site_name")} {year} | {t("tax_id")}:
            65854884
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
