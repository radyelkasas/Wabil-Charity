import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Component imports
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";

// Metadata for the page
export const metadata = {
  title: "Contact Us | Charity Organization",
  description:
    "Get in touch with our team. We're here to help and answer any questions you might have.",
};

// Inline Skeleton components
const ContactHeroSkeleton = () => (
  <section className="py-24 lg:py-32 relative bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-gray-950">
    <div className="container mx-auto px-4 relative z-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-10">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Hero content skeleton */}
      <div className="max-w-3xl mx-auto text-center">
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-8" />

        <Skeleton className="h-12 w-3/4 mx-auto mb-6" />

        <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
        <Skeleton className="h-5 w-5/6 max-w-2xl mx-auto mb-2" />
        <Skeleton className="h-5 w-4/6 max-w-2xl mx-auto mb-8" />

        {/* Contact quick info skeleton */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-12">
          <div className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full mr-3" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full mr-3" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactFormSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
    <Skeleton className="h-8 w-48 mb-6" />

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-32 w-full" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

export default function ContactPage() {

  return (
    <main className="overflow-hidden mb-10">
      {/* Hero Section */}
      <Suspense fallback={<ContactHeroSkeleton />}>
        <ContactHero />
      </Suspense>

      {/* Contact Form and Info Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Contact Form - takes 3 columns on large screens */}
            <div className="lg:col-span-4">
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info Tabs - takes 1 column on large screens */}
            <div className="lg:col-span-2">
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactInfo />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <Suspense
        fallback={
          <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
        }
      >
        <ContactMap />
      </Suspense>
    </main>
  );
}
