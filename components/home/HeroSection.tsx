"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, Phone } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the ImageSlider with no SSR
const ImageSlider = dynamic(() => import("./ImageSlider"), { ssr: false });

const HeroSection = () => {
  const t = useTranslations("home.hero");
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Social media items
  const socialMediaItems = [
    { icon: <Youtube className="h-5 w-5" />, href: "#", ariaLabel: "يوتيوب" },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "#",
      ariaLabel: "انستغرام",
    },
    { icon: <Facebook className="h-5 w-5" />, href: "#", ariaLabel: "فيسبوك" },
    { icon: <Phone className="h-5 w-5" />, href: "#", ariaLabel: "اتصل بنا" },
  ];

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden"
    >
      {/* Background with Image Slider */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/60 mix-blend-multiply z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20 z-10"></div>

        {/* Image Slider component instead of static Image */}
        <ImageSlider />
      </div>

      {/* Content overlay */}
      <div className="relative z-30 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Bismillah text */}
          <motion.p
            variants={itemVariants}
            className="text-white/90 text-lg md:text-xl font-medium mb-4"
          >
            {t("bismillah")}
          </motion.p>

          {/* Quran verse */}
          <motion.h1
            variants={itemVariants}
            className="font-extrabold text-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-6 drop-shadow-md"
          >
            {t("verse")}
          </motion.h1>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link href="/donate">
              <Button
                size="lg"
                className="px-8 py-6 rounded-md font-bold text-lg text-white"
              >
                {t("donate_button")}
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-transparent border-2 text-secondary border-secondary/80 hover:text-white hover:bg-secondary/20 px-8 py-6 rounded-md font-bold text-lg"
              >
                {t("browse_projects_button")}
              </Button>
            </Link>
          </motion.div>

          {/* Social media icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-5"
          >
            {socialMediaItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                aria-label={item.ariaLabel}
                className="text-white hover:text-primary/80 transition-colors duration-200 bg-black/20 p-2 rounded-full hover:bg-black/30"
              >
                {item.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
