import { NavigationProvider } from "@/components/project/NavigationProvider";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("ProjectLayout children:", children);
    
  return <NavigationProvider>{children}</NavigationProvider>;
}
