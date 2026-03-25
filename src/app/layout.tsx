import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diagnostic Grilles de Rémunération | DAIRIA Avocats",
  description:
    "Analyse comparative de vos grilles intérimaires avec les grilles officielles en vigueur - DAIRIA Avocats, cabinet expert en droit du travail et de la paie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.className} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
