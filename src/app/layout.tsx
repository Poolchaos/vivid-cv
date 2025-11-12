import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VividCV - Interactive Resume Builder",
    template: "%s | VividCV",
  },
  description:
    "Bring your resume to life with interactive 3D animations. Create stunning, animated web resumes that stand out from the crowd.",
  keywords: [
    "resume builder",
    "interactive resume",
    "3D resume",
    "animated CV",
    "web resume",
    "portfolio",
    "React Three Fiber",
  ],
  authors: [{ name: "VividCV" }],
  creator: "VividCV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vividcv.app",
    title: "VividCV - Interactive Resume Builder",
    description:
      "Bring your resume to life with interactive 3D animations. Create stunning, animated web resumes that stand out.",
    siteName: "VividCV",
  },
  twitter: {
    card: "summary_large_image",
    title: "VividCV - Interactive Resume Builder",
    description:
      "Bring your resume to life with interactive 3D animations. Create stunning, animated web resumes that stand out.",
    creator: "@vividcv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
