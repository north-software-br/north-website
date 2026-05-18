import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/footer";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/TTF/Satoshi-Variable.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/TTF/Satoshi-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "North Software",
  description: "Construído no Norte. Feito para o mundo.",
  icons: {
    icon: "/logos/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${satoshi.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
