
import HeroSection from "@/components/home/HeroSection";
import StatsCards from "@/components/home/StatsCards";
import CharitiesSection from "@/components/home/CharitiesSection";
import CurrentProjects from "@/components/home/CurrentProjects";

export default function Home() {


  return (
    <>
      <main>
        <HeroSection />
        <StatsCards />
        <CharitiesSection />
        <CurrentProjects />
      </main>
    </>
  );
}
