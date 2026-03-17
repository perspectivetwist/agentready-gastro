import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
  verification: { other: { 'msvalidate.01': '4238BAC83D0A84184DB5C8AEF5C3CE14' } },
  robots: { index: true, follow: true },
  title: "KI-Agent Readiness für Gastronomie | Kann KI bei deinem Restaurant reservieren?",
  description:
    "Kostenloser Agent-Readiness-Scan für die Gastronomie: Ist dein Restaurant für KI-Agenten buchbar? Jetzt prüfen.",
  openGraph: {
    title: "KI-Agent Readiness für Gastronomie | Kann KI bei deinem Restaurant reservieren?",
    description:
      "Kostenloser Agent-Readiness-Scan für die Gastronomie: Ist dein Restaurant für KI-Agenten buchbar?",
    url: "https://agentready-gastro.vercel.app",
    siteName: "AgentReady Gastro Scanner",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "KI-Agent Readiness für Gastronomie | Restaurant-Scanner",
    description: "Kostenloser Agent-Readiness-Scan für die Gastronomie: Ist dein Restaurant für KI-Agenten buchbar?",
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
        <GoogleAnalytics />
        <JsonLdSchema />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
