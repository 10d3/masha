import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
// import Script from 'next/script';
import Providers from "./provider";
import { DATA } from "@/lib/data/data";

declare global {
  interface Window {
    plausible: any;
  }
}

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "MarcKenley's Portfolio",
  description:
    "Showcasing projects, skills, and achievements in web development and design.",
  keywords: [
    "Next.js Developer",
    "Frontend Developer",
    "JavaScript Developer",
    "React Developer",
    "UI/UX Designer",
    "Full Stack Developer",
    "Web Development",
    "Responsive Design",
    "Performance Optimization",
    "MarcKenley Antoine Portfolio",
  ],
  openGraph: {
    title: "MarcKenley's Portfolio",
    description:
      "Explore my projects, skills, and accomplishments in web development and design. Let's create something amazing together!",
    url: DATA.url, // Replace with your actual portfolio URL
    siteName: "MarcKenley's Portfolio",
    images: [
      {
        url: DATA.image, // Replace with the URL of your OpenGraph image
        width: 1200,
        height: 630,
        alt: "MarcKenley's Portfolio - Web Development and Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarcKenley's Portfolio",
    description: "Discover web development projects, skills, and achievements.",
    creator: "@10d3", // Replace with your Twitter handle
    site: "@marckenley", // Replace with your Twitter handle
    images: [
      {
        url: DATA.image, // Replace with the same OpenGraph image
        alt: "MarcKenley's Portfolio - Web Development and Design",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}