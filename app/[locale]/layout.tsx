import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";

// Define the correct prop types for the layout
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

// Remove the async keyword from the function declaration
export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  return (
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
  );
}
