"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import ProjectDetail from "@/components/project/ProjectDetail";
import ProjectLoadingSkeleton from "@/components/project/ProjectLoadingSkeleton";
import { Project } from "@/types/project";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "إنشاء مدرسة في المناطق النائية",
    slug: "school-in-remote-areas",
    image: "/media/food-donation-box.webp",
    charityName: "جمعية التعليم للجميع",
    category: "education",
    targetAmount: 500000,
    raisedAmount: 350000,
    endDate: "25 رمضان 1446",
    description:
      "مشروع يهدف إلى بناء مدرسة متكاملة في المناطق النائية لتوفير التعليم للأطفال المحرومين من حقهم في التعليم. تشمل المدرسة 12 فصلاً دراسياً ومكتبة ومعمل كمبيوتر وملعب.",
    location: "الصعيد، مصر",
    beneficiaries: 500,
    updates: [
      {
        id: "1",
        date: "1 رجب 1446",
        title: "بدء عمليات الحفر",
        content:
          "تم البدء في عمليات الحفر والتجهيز للموقع وإعداد الأساسات للمبنى.",
      },
      {
        id: "2",
        date: "15 رجب 1446",
        title: "إكمال الأساسات",
        content:
          "تم الانتهاء من صب الأساسات والبدء في بناء الجدران للطابق الأول.",
      },
    ],
    gallery: [
      "/media/food-donation-box.webp",
      "/media/food-donation-box.webp",
      "/media/food-donation-box.webp",
    ],
    donors: [
      { id: "1", name: "أحمد محمود", amount: 50000, date: "1 رجب 1446" },
      { id: "2", name: "شركة الأمل", amount: 100000, date: "5 رجب 1446" },
      { id: "3", name: "متبرع كريم", amount: 25000, date: "10 رجب 1446" },
    ],
  },
  {
    id: "2",
    title: "توفير مياه نظيفة للقرى المحرومة",
    slug: "clean-water-project",
    image: "/images/projects/water.jpg",
    charityName: "مؤسسة الحياة",
    category: "water",
    targetAmount: 300000,
    raisedAmount: 210000,
    endDate: "15 شوال 1446",
    description:
      "مشروع يهدف إلى حفر آبار وإنشاء محطات تنقية مياه في القرى التي تعاني من نقص المياه النظيفة، مما يساهم في تحسين صحة السكان وتوفير مصدر دائم للمياه النقية.",
    location: "الوادي الجديد، مصر",
    beneficiaries: 2000,
    updates: [
      {
        id: "1",
        date: "5 رجب 1446",
        title: "تحديد مواقع الآبار",
        content:
          "تم تحديد 5 مواقع لحفر الآبار بعد دراسة مستفيضة للمنطقة وتحليل لجودة المياه الجوفية.",
      },
    ],
    gallery: ["/images/projects/water-1.jpg", "/images/projects/water-2.jpg"],
    donors: [
      { id: "1", name: "محمد علي", amount: 20000, date: "2 رجب 1446" },
      { id: "2", name: "متبرع كريم", amount: 50000, date: "7 رجب 1446" },
    ],
  },
];

export default function ProjectPage() {
  const params = useParams();
  const { slug } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const foundProject = mockProjects[0];
        //  mockProjects.find((p) => p.slug === slug);
        console.log("Found project:", foundProject);

        if (foundProject) {
          setProject(foundProject);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <ProjectLoadingSkeleton />;
  }

  if (!project) {
    return notFound();
  }

  return <ProjectDetail project={project} />;
}
