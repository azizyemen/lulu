import type { Metadata, Viewport } from "next";
import { Tajawal, El_Messiri, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});
const messiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-messiri",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const basePath = process.env.NODE_ENV === "production" ? "/lulu" : "";

export const metadata: Metadata = {
  title: "لولو · رفيقتكِ اليومية إلى الله",
  description:
    "منصة نسائية إسلامية عصرية: أذكار، قرآن، تسبيح، مهام، وتأمل — رفيقتكِ اليومية للتقرّب إلى الله والاعتناء بنفسكِ.",
  manifest: `${basePath}/manifest.json`,
};

export const viewport: Viewport = {
  themeColor: "#fdf8f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${messiri.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased">
        <div className="aurora" aria-hidden />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
