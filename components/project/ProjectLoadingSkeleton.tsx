"use client";

import React from "react";
import { motion } from "framer-motion";

const ProjectLoadingSkeleton: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* شريط التنقل المتحرك */}
      <div className="mb-6 flex items-center">
        <motion.div
          animate={{
            backgroundPosition: ["0%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
          className="h-4 w-24 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
        />
        <div className="mx-2 h-4 w-4"></div>
        <motion.div
          animate={{
            backgroundPosition: ["0%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
          className="h-4 w-28 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
        />
        <div className="mx-2 h-4 w-4"></div>
        <motion.div
          animate={{
            backgroundPosition: ["0%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
          className="h-4 w-32 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* الجانب الأيمن */}
        <div className="lg:col-span-2">
          {/* عنوان المتحرك */}
          <motion.div
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
            className="h-12 w-3/4 mb-6 rounded-lg bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
          />

          {/* الصورة المتحركة */}
          <motion.div
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
            className="aspect-video h-96 w-full mb-8 rounded-2xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
          />

          {/* معلومات إضافية متحركة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                }}
                className="h-24 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
              />
            ))}
          </div>

          {/* التبويبات متحركة */}
          <div className="mb-8">
            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-12 mb-6 rounded-lg bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.5,
                  }}
                  className="h-16 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
                />
              ))}
            </div>
          </div>
        </div>

        {/* الجانب الأيسر */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            {/* تفاصيل الجمعية متحركة */}
            <div className="flex justify-between items-center mb-6">
              <motion.div
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                }}
                className="h-6 w-32 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
              />
              <motion.div
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                }}
                className="h-12 w-12 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
              />
            </div>

            {/* شريط التقدم متحرك */}
            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-4 w-full mb-3 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />

            {/* النسبة المئوية والمبالغ متحركة */}
            <div className="flex justify-between items-center mb-5">
              <motion.div
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                }}
                className="h-6 w-16 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
              />
              <motion.div
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                }}
                className="h-6 w-40 rounded-full bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
              />
            </div>

            {/* المتبقي من الوقت متحرك */}
            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-16 w-full mb-6 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />

            {/* نموذج التبرع متحرك */}
            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-8 w-full mb-5 rounded-lg bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.5,
                  }}
                  className="h-10 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
                />
              ))}
            </div>

            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-12 w-full mb-5 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />

            <div className="space-y-4 mb-6">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundPosition: ["0%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1.5,
                  }}
                  className="h-12 rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
                />
              ))}
            </div>

            <motion.div
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
              className="h-12 w-full rounded-xl bg-gradient-to-l from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 background-animate"
            />
          </div>
        </div>
      </div>

      {/* مؤشر التحميل المتحرك */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 border-4 border-primary border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-primary font-medium">جاري تحميل المشروع...</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectLoadingSkeleton;
