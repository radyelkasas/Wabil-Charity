"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView, useAnimation } from "framer-motion";
// import { useTheme } from "next-themes";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  Coffee,
} from "lucide-react";

const Footer = () => {
  const t = useTranslations("footer");
  const [year, setYear] = useState<number>(2024);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update year to current year on client side
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger animations when footer comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Determine if dark mode is active
  // const isDark = mounted && theme === "dark";

  // Social media links with enhanced data
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      url: "#",
      ariaLabel: "Visit our Facebook page",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      url: "#",
      ariaLabel: "Follow us on Twitter",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "#",
      ariaLabel: "Follow us on Instagram",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      url: "#",
      ariaLabel: "Contact us on WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} />,
      url: "#",
      ariaLabel: "Subscribe to our YouTube channel",
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  // Quick links for footer navigation
  const quickLinks = [
    { name: t("quickLinks.home") || "Home", url: "/" },
    { name: t("quickLinks.projects") || "Projects", url: "/projects" },
    { name: t("quickLinks.about") || "About Us", url: "/about" },
    { name: t("quickLinks.contact") || "Contact", url: "/contact" },
    { name: t("quickLinks.donate") || "Donate", url: "/donate" },
  ];

  // Contact information for display in footer
  const contactInfo = [
    {
      icon: <Phone size={16} />,
      text: t("contactInfo.phone") || "+20 10 1234 5678",
      url: "tel:+201012345678",
    },
    {
      icon: <Mail size={16} />,
      text: t("contactInfo.email") || "info@wabel.org",
      url: "mailto:info@wabel.org",
    },
    {
      icon: <MapPin size={16} />,
      text: t("contactInfo.address") || "123 Al Nasr St, Cairo, Egypt",
      url: "https://maps.google.com",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Wave SVG for top decoration
  const TopWaveDecoration = () => (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px]"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-background dark:fill-background"
          opacity="0.25"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          className="fill-background dark:fill-background"
          opacity="0.5"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          className="fill-background dark:fill-background"
        ></path>
      </svg>
    </div>
  );

  // Corner decorations
  const TopLeftCorner = () => (
    <svg
      className="absolute top-0 left-0 w-40 h-40 text-primary opacity-20 transform -translate-x-1/4 -translate-y-1/4"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M42.8,-65.2C54.9,-60.3,63.9,-46.6,69.9,-32.2C76,-17.7,79.1,-2.5,76.7,11.9C74.4,26.3,66.7,39.9,56.1,53.8C45.5,67.7,32.1,81.9,16.5,84.8C0.9,87.7,-16.8,79.4,-30.1,68.8C-43.3,58.3,-52.1,45.5,-58.5,31.9C-64.9,18.3,-68.9,3.9,-66,-8.8C-63.2,-21.5,-53.5,-32.4,-42.7,-37.8C-31.9,-43.2,-20,-43,-7,-48.8C6,-54.6,30.7,-70.2,42.8,-65.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );

  const BottomRightCorner = () => (
    <svg
      className="absolute bottom-0 right-0 w-40 h-40 text-secondary opacity-20 transform translate-x-1/4 translate-y-1/4"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M32.7,-43.1C42.9,-38.9,51.9,-29.6,57.4,-17.9C62.9,-6.2,64.9,7.8,60.8,19.9C56.7,32,46.5,42.2,34.7,46.7C22.9,51.2,9.4,50,-2.3,53C-14,55.9,-23.9,63,-32.2,61.3C-40.5,59.6,-47.2,49.1,-48.3,38.3C-49.4,27.5,-45,16.4,-47.3,4.4C-49.7,-7.6,-58.9,-20.6,-57.6,-31.8C-56.3,-43,-44.6,-52.5,-32.2,-55.6C-19.7,-58.7,-6.5,-55.3,2.6,-58.8C11.8,-62.3,22.5,-72.8,28.1,-67.6C33.8,-62.4,34.2,-41.3,32.7,-43.1Z"
        transform="translate(100 100)"
      />
    </svg>
  );

  const Dots = () => (
    <svg
      className="absolute bottom-20 left-20 w-32 h-32 text-foreground opacity-5 dark:opacity-10"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="dots"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="5" cy="5" r="2" fill="currentColor" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-100 dark:bg-primary-foreground pt-20 pb-8 overflow-hidden text-slate-700 dark:text-slate-200"
    >
      {/* Top wave decoration */}
      <TopWaveDecoration />

      {/* Corner decorations */}
      <TopLeftCorner />
      <BottomRightCorner />
      <Dots />

      {/* Main footer content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-300 dark:border-slate-700 pb-2 mb-4 inline-block">
              {t("about.title") || "About Us"}
            </h3>
            <div className="flex items-center mb-4">
              <div className="bg-white dark:bg-slate-800 p-2 rounded-lg mr-3">
                <Image
                  src="/media/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <h4 className="text-xl font-bold">{t("site_name") || "وابل"}</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-3 rounded-lg">
              {t("about.description") ||
                "Our mission is to help those in need and make a positive impact on communities through charitable projects and initiatives."}
            </p>
            <div className="flex gap-2 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.ariaLabel}
                  className={`${social.color} p-2 rounded-full text-white transition-all duration-300`}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-300 dark:border-slate-700 pb-2 mb-4 inline-block">
              {t("quickLinks.title") || "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.url}
                    className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-300 dark:border-slate-700 pb-2 mb-4 inline-block">
              {t("contactInfo.title") || "Contact Us"}
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start group">
                  <div className="bg-slate-200 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-slate-700 p-2 rounded mt-1 mr-3 transition-colors duration-300">
                    {info.icon}
                  </div>
                  <a
                    href={info.url}
                    className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    {info.text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Working Hours */}
            <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700">
              <h4 className="font-semibold mb-2">
                {t("workingHours.title") || "Working Hours"}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("workingHours.weekdays") || "Sun - Thu: 9:00 AM - 5:00 PM"}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("workingHours.weekend") || "Fri - Sat: Closed"}
              </p>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-300 dark:border-slate-700 pb-2 mb-4 inline-block">
              {t("newsletter.title") || "Newsletter"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {t("newsletter.description") ||
                "Subscribe to our newsletter to receive updates about our projects and initiatives."}
            </p>
            <form className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder={
                    t("newsletter.emailPlaceholder") || "Your email address"
                  }
                  className="w-full py-2 px-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute left-1 top-1 bg-secondary hover:bg-secondary-600 text-white py-1 px-3 rounded-md transition-all duration-300 transform group-hover:scale-105"
                >
                  {t("newsletter.subscribe") || "Subscribe"}
                </button>
              </div>
            </form>

            {/* Donation CTA */}
            <motion.div
              className="mt-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-300 dark:border-slate-700"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <Heart className="text-secondary mr-2" size={20} />
                <h4 className="font-bold">
                  {t("donation.title") || "Support Our Cause"}
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                {t("donation.description") ||
                  "Your donation can make a real difference in someone's life."}
              </p>
              <Link
                href="/donate"
                className="block text-center bg-secondary hover:bg-secondary-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
              >
                {t("donation.button") || "Donate Now"}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Links and Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-slate-300 dark:border-slate-700 pt-6 mt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
              <Link
                href="/privacy-policy"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {t("bottomLinks.privacy") || "Privacy Policy"}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {t("bottomLinks.terms") || "Terms of Service"}
              </Link>
              <Link
                href="/faq"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {t("bottomLinks.faq") || "FAQ"}
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                {t("bottomLinks.sitemap") || "Sitemap"}
              </Link>
            </div>

            {/* Copyright */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
              <p>
                &copy; {year} {t("site_name") || "وابل"} •{" "}
                {t("all_rights_reserved")} • {t("tax_id")} 65854884
              </p>
            </div>
          </div>
        </motion.div>

        {/* Made with love */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-6 text-xs text-slate-500 dark:text-slate-400"
        >
          <p className="flex items-center justify-center">
            {t("madeWith") || "Made with"}{" "}
            <Heart className="mx-1 text-red-500" size={14} />{" "}
            {t("and") || "and"}{" "}
            <Coffee className="mx-1 text-amber-500" size={14} />{" "}
            {t("byDeveloper") || "by Amazing Team"}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary-600 text-white p-3 rounded-full shadow-lg z-50"
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
