"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";

  const switchLocale = (newLocale: string): void => {
    if (newLocale === currentLocale) return;

    setIsChanging(true);
    const segments = pathname.split("/");

    if (segments[1] === "ar" || segments[1] === "en") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join("/");
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Globe className="h-4 w-4" />
            <span className="sr-only">تغيير اللغة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => switchLocale("en")}
            className={
              currentLocale === "en"
                ? "bg-blue-50 text-blue-600 font-medium"
                : ""
            }
          >
            <div className="flex items-center gap-2">
              <span>English</span>
              {currentLocale === "en" && (
                <span className="ml-2 h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => switchLocale("ar")}
            className={
              currentLocale === "ar"
                ? "bg-purple-50 text-purple-600 font-medium"
                : ""
            }
          >
            <div className="flex items-center gap-2">
              <span>العربية</span>
              {currentLocale === "ar" && (
                <span className="ml-2 h-2 w-2 rounded-full bg-purple-600"></span>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isChanging && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-center font-medium text-gray-800 dark:text-gray-200">
              {currentLocale === "en"
                ? "جاري التحويل للعربية..."
                : "Switching to English..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
