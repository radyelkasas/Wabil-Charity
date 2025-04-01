import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

// Component imports
import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import StatsSection from "@/components/about/StatsSection";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";

// Metadata for the page
export const metadata = {
  title: "About Us | Charity Organization",
  description:
    "Learn about our mission, values, and the team behind our charity organization.",
};

// Inline Skeleton components
const HeroSkeleton = () => (
  <section className="py-16 lg:py-24 relative">
    <div className="container mx-auto px-4 relative z-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-10">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content skeleton */}
        <div className="order-2 lg:order-1">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-8" />

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Right image skeleton */}
        <div className="order-1 lg:order-2 relative">
          <Skeleton className="h-80 lg:h-[450px] rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

const ContentSkeleton = () => (
  <section className="py-16 lg:py-24">
    <div className="container mx-auto px-4">
      {/* Section header skeleton */}
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-64 mx-auto mb-6" />
        <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2" />
        <Skeleton className="h-4 w-5/6 max-w-2xl mx-auto" />
      </div>

      {/* Grid content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
            >
              <Skeleton className="h-16 w-16 rounded-full mb-6" />
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default function AboutPage() {
  // Translation hook for server components
  const t = useTranslations("about");

  // Board members data - moved from client component to server component to avoid unnecessary client-side computation
  const boardMembers = [
    {
      id: "1",
      name: t("team.member1.name"),
      position: t("team.member1.position"),
      image: "/media/team/member1.jpg",
      socialLinks: [
        { type: "twitter", url: "#" },
        { type: "linkedin", url: "#" },
      ],
    },
    {
      id: "2",
      name: t("team.member2.name"),
      position: t("team.member2.position"),
      image: "/media/team/member2.jpg",
      socialLinks: [
        { type: "twitter", url: "#" },
        { type: "linkedin", url: "#" },
      ],
    },
    {
      id: "3",
      name: t("team.member3.name"),
      position: t("team.member3.position"),
      image: "/media/team/member3.jpg",
      socialLinks: [
        { type: "twitter", url: "#" },
        { type: "linkedin", url: "#" },
      ],
    },
    {
      id: "4",
      name: t("team.member1.name"),
      position: t("team.member1.position"),
      image: "/media/team/member1.jpg",
      socialLinks: [
        { type: "twitter", url: "#" },
        { type: "linkedin", url: "#" },
      ],
    },
  ];

  // Values data - kept on server side
  const values = [
    {
      id: "1",
      title: t("values.integrity.title"),
      description: t("values.integrity.description"),
      icon: "CheckCircle2",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      id: "2",
      title: t("values.compassion.title"),
      description: t("values.compassion.description"),
      icon: "Heart",
      color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
    },
    {
      id: "3",
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
      icon: "Users",
      color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
    {
      id: "4",
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
      icon: "Target",
      color:
        "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    },
  ];

  // Stats data
  const stats = [
    { id: "1", value: 15, label: t("stats.years") },
    { id: "2", value: 100000, label: t("stats.beneficiaries") },
    { id: "3", value: 500, label: t("stats.projects") },
    { id: "4", value: 30, label: t("stats.countries") },
  ];

  return (
    <main className="overflow-hidden mb-10">
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <AboutHero />
      </Suspense>

      {/* Mission Section */}
      <Suspense fallback={<ContentSkeleton />}>
        <MissionSection />
      </Suspense>

      {/* Values Section */}
      <Suspense fallback={<ContentSkeleton />}>
        <ValuesSection values={values} />
      </Suspense>

      {/* Stats Section */}
      <Suspense fallback={<ContentSkeleton />}>
        <StatsSection stats={stats} />
      </Suspense>

      {/* Team Section */}
      <Suspense fallback={<ContentSkeleton />}>
        <TeamSection boardMembers={boardMembers} />
      </Suspense>

      {/* CTA Section */}
      <AboutCTA />
    </main>
  );
}
