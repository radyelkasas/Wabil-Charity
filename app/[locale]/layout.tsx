"use server";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "@/providers/SessionProvider";

// Define the correct prop types for the layout
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

// Use async to properly await the params
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Make sure to await params if it's a Promise
  const paramsValue = await params;
  const locale = paramsValue.locale;

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale}>
        <div
          lang={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className={`${locale === "ar" ? "rtl" : "ltr"}`}
          data-lang={locale}
          data-dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <Navbar />
          {children}
          <Footer />
        </div>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
