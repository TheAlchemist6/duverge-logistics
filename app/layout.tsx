import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Duverge Logistics | Florida's Premier Freight Broker",
  description: "Next-day delivery, personalized service, and 1000+ vetted carriers. Duverge Logistics is Florida's most reliable logistics partner for medium and large B2B businesses.",
  keywords: ["logistics", "freight brokerage", "Florida logistics", "next-day delivery", "supply chain", "warehousing", "heavy hauling"],
  openGraph: {
    title: "Duverge Logistics | Florida's Premier Freight Broker",
    description: "Next-day delivery, personalized service, and 1000+ vetted carriers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0a1628] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
