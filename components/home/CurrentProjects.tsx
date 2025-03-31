"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "../ProjectCard";

// Define interfaces for project types
interface ProjectType {
  id: string;
  name: string;
  description?: string;
}

interface Charity {
  id: string;
  name: string;
  logo?: string;
}

interface Project {
  id: string;
  title: string;
  image: string;
  charity: Charity;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  endDate: string;
  slug: string;
}

const CurrentProjects = () => {
  const t = useTranslations("home.projects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState("all");

  // Project categories with their IDs
  const projectTypes: ProjectType[] = [
    { id: "all", name: t("categories.all") },
    { id: "food", name: t("categories.food") },
    { id: "health", name: t("categories.health") },
    { id: "marriage", name: t("categories.marriage") },
    { id: "charity", name: t("categories.charity") },
  ];

  const projects: Project[] = [
    {
      id: "1",
      title: t("project1.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "1", name: t("charities.resala") },
      category: "food",
      targetAmount: 50000,
      raisedAmount: 25000,
      endDate: "27-7-2024",
      slug: "ramadan-food-campaign-1",
    },
    {
      id: "2",
      title: t("project1.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "1", name: t("charities.resala") },
      category: "food",
      targetAmount: 50000,
      raisedAmount: 25000,
      endDate: "27-7-2024",
      slug: "ramadan-food-campaign-2",
    },
    {
      id: "3",
      title: t("project1.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "1", name: t("charities.resala") },
      category: "food",
      targetAmount: 50000,
      raisedAmount: 25000,
      endDate: "27-7-2024",
      slug: "ramadan-food-campaign-3",
    },
    {
      id: "4",
      title: t("project2.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "2", name: t("charities.orman") },
      category: "health",
      targetAmount: 75000,
      raisedAmount: 30000,
      endDate: "15-8-2024",
      slug: "medical-treatment-campaign",
    },
    {
      id: "5",
      title: t("project3.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "3", name: t("charities.mek") },
      category: "marriage",
      targetAmount: 100000,
      raisedAmount: 45000,
      endDate: "30-9-2024",
      slug: "marriage-support-campaign",
    },
    {
      id: "6",
      title: t("project4.title"),
      image: "/media/food-donation-box.webp",
      charity: { id: "4", name: t("charities.mersal") },
      category: "charity",
      targetAmount: 60000,
      raisedAmount: 20000,
      endDate: "10-8-2024",
      slug: "charity-support-campaign",
    },
  ];

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "all"
      ? projects.slice(0, 3)
      : projects
          .filter((project) => project.category === activeTab)
          .slice(0, 3);

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

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4 py-14 bg-gray-50/50 dark:bg-gray-950/15 rounded-lg">
        {/* Section Header */}
        <div className="mb-6 text-center">
          <h2 className="text-5xl font-extrabold mb-3 flex justify-center items-center gap-2">
            <span className="text-gray-900 dark:text-white">
              {t("title_part1")}
            </span>
            <span className="text-primary">{t("title_part2")}</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="grid grid-cols-5 md:w-auto w-full mx-auto my-12">
            {projectTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="text-sm md:text-base"
              >
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <Link href={`/project/${project.slug}`} key={project.id}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    image={project.image}
                    charityName={project.charity.name}
                    category={project.category}
                    targetAmount={project.targetAmount}
                    raisedAmount={project.raisedAmount}
                    endDate={project.endDate}
                    slug={project.slug}
                    index={index}
                  />
                </Link>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-8">
          <Link href="/projects">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              {t("view_all")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
