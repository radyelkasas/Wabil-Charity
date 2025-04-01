import { Skeleton } from "@/components/ui/skeleton";

// Hero section skeleton
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

// Content section skeleton
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

export default function Loading() {
  return (
    <div className="space-y-8">
      <HeroSkeleton />
      <ContentSkeleton />
      <ContentSkeleton />
      <ContentSkeleton />
      <ContentSkeleton />
    </div>
  );
}
