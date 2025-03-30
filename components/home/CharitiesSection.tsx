"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

// Define a charity item interface
interface CharityItem {
  id: number;
  name: string;
  logo: string;
  url: string;
  color: string;
}

const CharitiesSection = () => {
  const t = useTranslations("home.charities");
  const pathname = usePathname();
  const [isRTL, setIsRTL] = useState(false);

  // Detect direction based on locale in the pathname
  useEffect(() => {
    const isArabic = !pathname.startsWith("/en");
    setIsRTL(isArabic);

    // Add dir attribute to the document for embla carousel to work properly
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    return () => {
      // Clean up on unmount if needed
      document.documentElement.removeAttribute("dir");
    };
  }, [pathname]);

  // Charity organizations data
  const charities: CharityItem[] = [
    {
      id: 1,
      name: "Bank Al-Ta'am Al-Masri",
      logo: "/media/Bank.webp",
      url: "#",
      color: "#28A6AC",
    },
    {
      id: 2,
      name: "Mersal Foundation",
      logo: "/media/Mersal.webp",
      url: "#",
      color: "#F6B93B",
    },
    {
      id: 3,
      name: "Al-Orman Association",
      logo: "/media/Al-Orman.webp",
      url: "#",
      color: "#7CB83D",
    },
    {
      id: 4,
      name: "Resala Charity",
      logo: "/media/Resala.webp",
      url: "#",
      color: "#E74C3C",
    },
    {
      id: 5,
      name: "Egyptian Food Bank",
      logo: "/media/Food.webp",
      url: "#",
      color: "#107C41",
    },
    {
      id: 6,
      name: "Bank Al-Ta'am Al-Masri",
      logo: "/media/Bank.webp",
      url: "#",
      color: "#28A6AC",
    },
    {
      id: 7,
      name: "Mersal Foundation",
      logo: "/media/Mersal.webp",
      url: "#",
      color: "#F6B93B",
    },
    {
      id: 8,
      name: "Al-Orman Association",
      logo: "/media/Al-Orman.webp",
      url: "#",
      color: "#7CB83D",
    },
    {
      id: 9,
      name: "Resala Charity",
      logo: "/media/Resala.webp",
      url: "#",
      color: "#E74C3C",
    },
    {
      id: 10,
      name: "Egyptian Food Bank",
      logo: "/media/Food.webp",
      url: "#",
      color: "#107C41",
    },
  ];


  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-extrabold mb-3">
            <span className="text-gray-900 dark:text-white">
              {t("title_part1")}
            </span>{" "}
            <span className="text-primary ml-2">{t("title_part2")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Charities Carousel with RTL support */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="w-full"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {charities.map((charity) => (
              <CarouselItem
                key={charity.id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Link href={charity.url}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                      <div className="relative w-full h-full">
                        <Image
                          src={charity.logo}
                          alt={charity.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={charity.id <= 2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Swapped previous and next buttons for RTL */}
          <div className="hidden md:block">
            {isRTL ? (
              <>
                <CarouselNext className="right-0 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
                <CarouselPrevious className="left-0 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
              </>
            ) : (
              <>
                <CarouselPrevious className="left-0 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
                <CarouselNext className="right-0 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
              </>
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CharitiesSection;
