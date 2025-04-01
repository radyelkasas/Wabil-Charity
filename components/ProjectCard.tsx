"use client";

import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  id: string;
  title: string;
  image: string;
  charityName: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  endDate: string;
  slug: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  charityName,
  category,
  targetAmount,
  raisedAmount,
  endDate,

  index,
}) => {
  const t = useTranslations("home.projects");

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  // Calculate progress percentage
  const calculateProgress = (raised: number, target: number) => {
    return Math.round((raised / target) * 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-primary-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative"
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <Image
          src="/media/food-donation-box.webp"
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 px-4 py-1.5 rounded-full text-base font-medium">
          {category}
        </div>
      </div>

      {/* Date and Charity */}
      <div className="flex justify-between items-center px-4 pt-4 pb-2">
        <div className="text-amber-500 text-base font-semibold">{endDate}</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-300 text-base">
            {charityName}
          </span>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
            {/* Charity Logo (simplified as a placeholder circle) */}
            <div className="h-7 w-7 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Project Title */}
      <h3 className="text-xl font-bold text-right px-4 mb-4 line-clamp-2 min-h-[3.5rem]">
        {title}
      </h3>

      {/* Progress Bar */}
      <div className="px-4 mb-3">
        <Progress
          value={calculateProgress(raisedAmount, targetAmount)}
          className="h-3 bg-gray-200 dark:bg-gray-700"
        />
      </div>

      {/* Amounts and Percentage */}
      <div className="flex justify-between items-center px-4 pb-4 text-base">
        <div className="font-bold text-teal-500">
          {calculateProgress(raisedAmount, targetAmount)}%
        </div>
        <div>
          <span className="text-teal-500 font-bold">
            {formatCurrency(raisedAmount)} {t("currency")}
          </span>
          <span className="text-gray-500 dark:text-gray-400 mx-1">
            {t("from")}
          </span>
          <span className="font-bold">
            {formatCurrency(targetAmount)} {t("currency")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
