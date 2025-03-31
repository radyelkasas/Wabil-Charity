import type { Metadata } from "next";
import { Geist, Geist_Mono, Almarai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import localFont from "next/font/local";

const vipHala = localFont({
  src: "../public/fonts/VIP Hala Bold VIP Hala Bold.otf",
  variable: "--font-vip-hala",
  display: "swap",
});

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-almarai",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wabil Charity",
  description:
    "Wabil Charity is a non-profit organization dedicated to providing support and resources to those in need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${vipHala.variable} ${geistSans.variable} ${geistMono.variable} ${almarai.variable} font-almarai antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
