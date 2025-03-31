"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// إنشاء context للتنقل
const NavigationContext = createContext({
  isNavigating: false,
});

export const useNavigation = () => useContext(NavigationContext);

// مكون مزود التنقل
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPathname, setPrevPathname] = useState("");

  useEffect(() => {
    // إذا تغير المسار
    if (prevPathname !== pathname && prevPathname !== "") {
      setIsNavigating(true);

      // انتظر لمدة 600 مللي ثانية لإكمال الانتقال
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 600);

      return () => clearTimeout(timer);
    }

    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  return (
    <NavigationContext.Provider value={{ isNavigating }}>
      {/* طبقة التنقل */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
          >
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 border-4 border-primary border-r-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-primary font-medium">جاري التنقل...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
