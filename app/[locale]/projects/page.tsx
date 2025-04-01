"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageLoadingIndicator from "@/components/project/PageLoadingIndicator";
import NoResultsFound from "@/components/project/NoResultsFound";

interface Project {
  id: string;
  title: string;
  image: string;
  charityName: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  endDate: string;
  slug: string;
}

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 9;

  // محاكاة جلب البيانات
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // محاكاة تأخير الشبكة
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // بيانات مزيفة للمشاريع
        const mockProjects = Array(24)
          .fill(null)
          .map((_, index) => ({
            id: `project-${index + 1}`,
            title:
              index % 3 === 0
                ? t("mockProjects.education")
                : index % 3 === 1
                ? t("mockProjects.water")
                : t("mockProjects.health"),
            image: `/images/projects/${(index % 4) + 1}.jpg`,
            charityName:
              index % 2 === 0 ? t("charities.resala") : t("charities.orman"),
            category:
              index % 5 === 0
                ? "education"
                : index % 5 === 1
                ? "water"
                : index % 5 === 2
                ? "health"
                : index % 5 === 3
                ? "food"
                : "shelter",
            targetAmount: (Math.floor(Math.random() * 10) + 5) * 100000,
            raisedAmount: (Math.floor(Math.random() * 8) + 1) * 50000,
            endDate: `${Math.floor(Math.random() * 20) + 1} ${t(
              "months.ramadan"
            )} 1446`,
            slug: `project-slug-${index + 1}`,
          }));

        setProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [t]);

  // تصفية المشاريع
  const filteredProjects = projects.filter((project) => {
    // تصفية حسب البحث
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.charityName.toLowerCase().includes(searchQuery.toLowerCase());

    // تصفية حسب الفئة
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // ترتيب المشاريع
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]);
      case "oldest":
        return parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]);
      case "mostFunded":
        return (
          b.raisedAmount / b.targetAmount - a.raisedAmount / a.targetAmount
        );
      case "leastFunded":
        return (
          a.raisedAmount / a.targetAmount - b.raisedAmount / b.targetAmount
        );
      case "highestTarget":
        return b.targetAmount - a.targetAmount;
      case "lowestTarget":
        return a.targetAmount - b.targetAmount;
      default:
        return 0;
    }
  });

  // تقسيم الصفحات
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  // تحميل المزيد من المشاريع
  const loadMoreProjects = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // إعادة تعيين الفلاتر
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // تأثيرات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  // التحقق من أي تصفية
  const hasFilters =
    searchQuery !== "" || categoryFilter !== "all" || sortBy !== "newest";

  return (
    <>
      {loading && <PageLoadingIndicator />}

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* عنوان الصفحة */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={headerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* أدوات البحث والتصفية */}
          <motion.div
            variants={searchVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* البحث */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-6 text-right"
              />
            </div>

            {/* فلترة حسب الفئة */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("filterByCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("categories.all")}</SelectItem>
                  <SelectItem value="education">
                    {t("categories.education")}
                  </SelectItem>
                  <SelectItem value="water">{t("categories.water")}</SelectItem>
                  <SelectItem value="health">
                    {t("categories.health")}
                  </SelectItem>
                  <SelectItem value="food">{t("categories.food")}</SelectItem>
                  <SelectItem value="shelter">
                    {t("categories.shelter")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* الترتيب */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t("sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("sort.newest")}</SelectItem>
                  <SelectItem value="oldest">{t("sort.oldest")}</SelectItem>
                  <SelectItem value="mostFunded">
                    {t("sort.mostFunded")}
                  </SelectItem>
                  <SelectItem value="leastFunded">
                    {t("sort.leastFunded")}
                  </SelectItem>
                  <SelectItem value="highestTarget">
                    {t("sort.highestTarget")}
                  </SelectItem>
                  <SelectItem value="lowestTarget">
                    {t("sort.lowestTarget")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* نتائج التصفية */}
          {hasFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    {t("resultsFound", { count: filteredProjects.length })}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  {t("clearFilters")}
                </Button>
              </div>
            </motion.div>
          )}

          {/* قائمة المشاريع */}
          {!loading && (
            <>
              {currentProjects.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence>
                    {currentProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Link href={`/project/${project.slug}`}>
                          <ProjectCard
                            id={project.id}
                            title={project.title}
                            image={project.image}
                            charityName={project.charityName}
                            category={project.category}
                            targetAmount={project.targetAmount}
                            raisedAmount={project.raisedAmount}
                            endDate={project.endDate}
                            slug={project.slug}
                            index={index}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <NoResultsFound onClearFilters={clearFilters} />
              )}

              {/* تحميل المزيد / ترقيم الصفحات */}
              {currentProjects.length > 0 && currentPage < totalPages && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 text-center"
                >
                  <Button
                    onClick={loadMoreProjects}
                    variant="outline"
                    className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {t("loadMore")}
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
