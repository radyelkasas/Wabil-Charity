"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface NoResultsFoundProps {
  onClearFilters: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ onClearFilters }) => {
  const t = useTranslations("projects");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 text-center"
    >
      <div className="mx-auto max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          className="mx-auto mb-6 w-64 h-48"
          aria-hidden="true"
        >
          <rect width="800" height="600" fill="#f8fafc" rx="20" ry="20" />

          <circle cx="400" cy="300" r="220" fill="#f1f5f9" />

          <g transform="translate(290, 180)">
            <rect
              width="220"
              height="240"
              rx="12"
              ry="12"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2"
            />

            <rect
              x="10"
              y="10"
              width="200"
              height="120"
              rx="8"
              ry="8"
              fill="#e2e8f0"
            />

            <circle cx="110" cy="70" r="30" fill="#cbd5e1" />
            <circle cx="110" cy="70" r="24" fill="#f8fafc" />
            <path
              d="M123,83 L132,92"
              stroke="#94a3b8"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              cx="110"
              cy="70"
              r="15"
              stroke="#94a3b8"
              strokeWidth="6"
              fill="none"
            />

            <rect
              x="20"
              y="145"
              width="180"
              height="12"
              rx="6"
              ry="6"
              fill="#e2e8f0"
            />
            <rect
              x="20"
              y="170"
              width="140"
              height="10"
              rx="5"
              ry="5"
              fill="#e2e8f0"
            />
            <rect
              x="20"
              y="190"
              width="100"
              height="10"
              rx="5"
              ry="5"
              fill="#e2e8f0"
            />
            <rect
              x="20"
              y="215"
              width="180"
              height="8"
              rx="4"
              ry="4"
              fill="#e2e8f0"
            />
          </g>

          <g transform="translate(400, 460)" textAnchor="middle">
            <text
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="24"
              fill="#475569"
            >
              لا توجد نتائج للبحث
            </text>
          </g>

          <g transform="translate(520, 310)">
            <circle cx="0" cy="0" r="50" fill="#e2e8f0" opacity="0.6" />
            <circle cx="0" cy="0" r="40" fill="#ffffff" />
            <path
              d="M-16,-16 L20,20"
              stroke="#94a3b8"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle
              cx="-16"
              cy="-16"
              r="24"
              stroke="#94a3b8"
              strokeWidth="10"
              fill="none"
            />
          </g>

          <circle cx="180" cy="150" r="8" fill="#cbd5e1" />
          <circle cx="200" cy="190" r="5" fill="#cbd5e1" />
          <circle cx="150" cy="180" r="6" fill="#cbd5e1" />

          <circle cx="620" cy="150" r="8" fill="#cbd5e1" />
          <circle cx="640" cy="190" r="5" fill="#cbd5e1" />
          <circle cx="600" cy="180" r="6" fill="#cbd5e1" />

          <circle cx="620" cy="450" r="8" fill="#cbd5e1" />
          <circle cx="640" cy="490" r="5" fill="#cbd5e1" />
          <circle cx="600" cy="480" r="6" fill="#cbd5e1" />

          <circle cx="180" cy="450" r="8" fill="#cbd5e1" />
          <circle cx="200" cy="490" r="5" fill="#cbd5e1" />
          <circle cx="150" cy="480" r="6" fill="#cbd5e1" />

          <g transform="translate(240, 310)">
            <circle cx="0" cy="0" r="40" fill="#e2e8f0" opacity="0.6" />
            <text
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="64"
              fill="#94a3b8"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ؟
            </text>
          </g>
        </svg>
        <h3 className="text-xl font-bold mb-2">{t("noResults")}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {t("tryAdjustingFilters")}
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-primary hover:bg-primary/90"
        >
          {t("clearFilters")}
        </Button>
      </div>
    </motion.div>
  );
};

export default NoResultsFound;
