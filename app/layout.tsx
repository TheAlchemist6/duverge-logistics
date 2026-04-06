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
  title: "Duverge Logistics | Freight Brokerage",
  description: "Next-day delivery, personalized service, and instant response. Duverge Logistics is your most reliable logistics partner serving the United States & Canada.",
  keywords: ["logistics", "freight brokerage", "shipping", "next-day delivery", "supply chain", "warehousing", "heavy hauling", "LTL", "truckload"],
  openGraph: {
    title: "Duverge Logistics | Freight Brokerage",
    description: "Next-day delivery, personalized service, and instant response. Serving the United States & Canada.",
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Duverge Logistics Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Duverge Logistics | Freight Brokerage",
    description: "Next-day delivery, personalized service, and instant response.",
    images: ['/logo.png'],
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
