"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/types/project";
import gsap from "gsap";
import DonationForm from "./DonationForm";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const t = useTranslations("project");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // أنيميشن للعنوان باستخدام GSAP
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // أنيميشن للصورة باستخدام GSAP
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0.5,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  // حساب نسبة التقدم
  const calculateProgress = (raised: number, target: number) => {
    return Math.round((raised / target) * 100);
  };

  // تنسيق العملة
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // تأثيرات الحركة بواسطة Framer Motion
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto py-24">
      {/* شريط التنقل */}
      <div className="mb-6 flex items-center text-gray-500 dark:text-gray-400 text-sm">
        <Link href="/" className="hover:text-primary transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <ArrowRight className="mx-2 h-4 w-4 rotate-180" />
        <Link href="/projects" className="hover:text-primary transition-colors">
          {t("breadcrumbs.projects")}
        </Link>
        <ArrowRight className="mx-2 h-4 w-4 rotate-180" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {project.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* الجانب الأيمن - تفاصيل المشروع */}
        <div className="lg:col-span-4">
          {/* عنوان المشروع */}
          <h1
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-6 text-right"
          >
            {project.title}
          </h1>

          {/* صورة المشروع */}
          <div
            ref={imageRef}
            className="relative h-96 mb-8 rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              priority
            />
            {/* شارة الفئة */}
            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 px-4 py-1.5 rounded-full text-base font-medium">
              {t("categories." + project.category)}
            </div>
          </div>

          {/* معلومات إضافية */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="mr-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {t("location")}
                </h3>
                <p className="font-medium">{project.location}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center"
            >
              <div className="bg-amber-500/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-amber-500" />
              </div>
              <div className="mr-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {t("endDate")}
                </h3>
                <p className="font-medium">{project.endDate}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center"
            >
              <div className="bg-teal-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-teal-500" />
              </div>
              <div className="mr-4">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {t("beneficiaries")}
                </h3>
                <p className="font-medium">
                  {project.beneficiaries} {t("person")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* التبويبات: الوصف، التحديثات، المتبرعين، المعرض */}
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg ms-auto rtl:justify-end ltr:justify-start">
              <TabsTrigger value="description">
                {t("tabs.description")}
              </TabsTrigger>
              <TabsTrigger value="updates">{t("tabs.updates")}</TabsTrigger>
              <TabsTrigger value="donors">{t("tabs.donors")}</TabsTrigger>
              <TabsTrigger value="gallery">{t("tabs.gallery")}</TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="text-lg text-right leading-relaxed"
            >
              <p>{project.description}</p>
            </TabsContent>

            <TabsContent value="updates">
              {project.updates.length > 0 ? (
                <div className="space-y-4">
                  {project.updates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                          {update.date}
                        </div>
                        <h3 className="text-xl font-bold">{update.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-right">
                        {update.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noUpdates")}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="donors">
              {project.donors.length > 0 ? (
                <div className="space-y-3">
                  {project.donors.map((donor) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                      <div className="text-teal-500 font-bold">
                        {formatCurrency(donor.amount)} {t("currency")}
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium">{donor.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {donor.date}
                          </p>
                        </div>
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noDonors")}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="gallery">
              {project.gallery.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative h-60 rounded-xl overflow-hidden shadow-sm"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 flex flex-col items-center">
                  <ImageIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noImages")}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* الجانب الأيسر - بطاقة التبرع */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
          >
            {/* تفاصيل الجمعية */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600 dark:text-gray-300 text-base">
                {project.charityName}
              </div>
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                {/* شعار الجمعية (placeholder) */}
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="mb-5">
              <Progress
                value={calculateProgress(
                  project.raisedAmount,
                  project.targetAmount
                )}
                className="h-4 bg-gray-200 dark:bg-gray-700 mb-3"
              />

              {/* النسبة المئوية والمبالغ */}
              <div className="flex justify-between items-center text-base">
                <div className="font-bold text-teal-500">
                  {calculateProgress(
                    project.raisedAmount,
                    project.targetAmount
                  )}
                  %
                </div>
                <div>
                  <span className="text-teal-500 font-bold">
                    {formatCurrency(project.raisedAmount)} {t("currency")}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 mx-2">
                    {t("from")}
                  </span>
                  <span className="font-bold">
                    {formatCurrency(project.targetAmount)} {t("currency")}
                  </span>
                </div>
              </div>
            </div>

            {/* المتبقي من الوقت */}
            <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl p-4 mb-6 flex justify-between items-center">
              <div className="text-amber-600 dark:text-amber-500 font-bold">
                20 {t("days")}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {t("remainingTime")}
              </div>
            </div>

            {/* نموذج التبرع */}
            <DonationForm projectId={project.id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
