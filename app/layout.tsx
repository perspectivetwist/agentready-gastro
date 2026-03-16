import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Slipstream – Können KI-Agenten auf deiner Website handeln?",
  description:
    "Kostenloser Agent-Readiness-Check: Misst in 20 Sekunden ob KI-Agenten deine Website finden, verstehen und darauf handeln können.",
  openGraph: {
    title: "Slipstream – Agent-Readiness für deine Website",
    description:
      "Kostenloser Check: Können KI-Agenten auf deiner Website handeln?",
    url: "https://agentready-transformer.vercel.app",
    siteName: "Slipstream",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Slipstream Agent-Readiness Check",
    description: "Können KI-Agenten auf deiner Website handeln? Kostenloser Check.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
