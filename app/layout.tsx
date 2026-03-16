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
  robots: { index: true, follow: true },
  title: "KI-Agent Readiness | Kann KI bei deinem Restaurant reservieren?",
  description:
    "Kostenloser Scan: Ist dein Restaurant für KI-Agenten buchbar? Jetzt Agent-Readiness prüfen.",
  openGraph: {
    title: "KI-Agent Readiness | Kann KI bei deinem Restaurant reservieren?",
    description:
      "Kostenloser Scan: Ist dein Restaurant für KI-Agenten buchbar? Jetzt Agent-Readiness prüfen.",
    url: "https://agentready-gastro.vercel.app",
    siteName: "AgentReady Gastro Scanner",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "KI-Agent Readiness | Kann KI bei deinem Restaurant reservieren?",
    description: "Kostenloser Scan: Ist dein Restaurant für KI-Agenten buchbar? Jetzt Agent-Readiness prüfen.",
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
