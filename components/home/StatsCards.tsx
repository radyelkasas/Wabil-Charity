"use client";

import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// استيراد مكون LottieIcon بشكل ديناميكي مع تأخير تحميله حتى يصبح مرئيًا
const LottieIcon = dynamic(() => import("./LottieIcon"), {
  ssr: false,
});

const StatCard = ({
  icon,
  number,
  label,
  textLabel,
  color,
  index,
  locale,
}: {
  icon: string;
  number: string | number;
  label: string;
  textLabel: string;
  color: string;
  index: number;
  locale: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isArabic = locale === "ar";

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-primary-foreground rounded-lg shadow-md p-6 flex flex-col items-center justify-center transform transition-all duration-500 hover:shadow-lg"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="mb-3 flex items-center justify-center"
        style={{ minHeight: "60px" }}
      >
        {/* تحميل الأيقونة فقط عندما تكون في مجال الرؤية */}
        {isInView && (
          <LottieIcon
            src={icon}
            color={color}
            width={80}
            height={80}
            className="w-15 h-15 object-contain"
          />
        )}
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold" style={{ color }}>
            {number}
          </span>
          {index === 1 && isArabic && (
            <span className="text-xl font-semibold" style={{ color }}>
              باب
            </span>
          )}
          {index === 1 && !isArabic && (
            <span className="text-xl font-semibold" style={{ color }}>
              Ways
            </span>
          )}
        </div>
        <h3 className="text-lg">
          {isArabic ? (
            <>
              {index === 0 ? (
                <>
                  <span style={{ color }}>{label}</span>
                  {" " + textLabel}
                </>
              ) : index === 1 ? (
                <>
                  <span style={{ color }}>مختلف</span> التبرع
                </>
              ) : index === 2 ? (
                <>
                  <span style={{ color }}>أكثر من</span> {textLabel}
                </>
              ) : (
                <>
                  <span style={{ color }}>مشروع</span> خيري
                </>
              )}
            </>
          ) : (
            <>
              {index === 0 ? (
                <>
                  <span style={{ color }}>{label}</span>
                  {" " + textLabel}
                </>
              ) : index === 1 ? (
                <>
                  <span style={{ color }}>{label}</span> {textLabel}
                </>
              ) : index === 2 ? (
                <>
                  <span style={{ color }}>{label}</span> {textLabel}
                </>
              ) : (
                <>
                  <span style={{ color }}>{label}</span> {textLabel}
                </>
              )}
            </>
          )}
        </h3>
      </div>
    </div>
  );
};

const StatsCards = () => {
  const t = useTranslations("home.stats");
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "ar";

  // استخدام useMemo لمنع إعادة إنشاء مصفوفة الإحصائيات عند كل عملية تصيير
  const stats = useMemo(
    () => [
      {
        icon: "/media/icons/transparency-icon.json",
        number: t("transparency_label"),
        label: t("transparency_label"),
        textLabel: t("transparency_text"),
        color: "#28A6AC",
      },
      {
        icon: "/media/icons/donation-icon.json",
        number: 15,
        label: t("donation_methods_label"),
        textLabel: t("donation_methods_text"),
        color: "#F0A500",
      },
      {
        icon: "/media/icons/charity-icon.json",
        number: 50,
        label: t("charities_label"),
        textLabel: t("charities_text"),
        color: "#E94D8B",
      },
      {
        icon: "/media/icons/project-icon.json",
        number: 152,
        label: t("projects_label"),
        textLabel: t("projects_text"),
        color: "#28A6AC",
      },
    ],
    [t]
  ); // إعادة الحساب فقط عندما تتغير الترجمات

  return (
    <section className="relative -mt-16 z-10 container mx-auto px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={`stat-card-${index}`}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
            textLabel={stat.textLabel}
            color={stat.color}
            index={index}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
