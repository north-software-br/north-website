import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ScrollRestoration from "@/components/scroll-restoration";

const satoshi = localFont({
  src: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "North Software — Sistemas, Apps e Sites sob medida",
    template: "%s | North Software",
  },
  description:
    "Software house do Norte do Brasil: sistemas para operações internas, aplicativos mobile, sites de alta conversão e automação com IA. Construído no Norte. Feito para o mundo.",
  metadataBase: new URL("https://northsoftware.com.br"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logos/favicons/favicon.ico", sizes: "48x48" },
      { url: "/logos/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/logos/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/logos/favicons/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logos/favicons/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/logos/favicons/site.webmanifest" },
    ],
  },
  openGraph: {
    title: "North Software",
    description: "Construído no Norte. Feito para o mundo.",
    url: "https://northsoftware.com.br",
    siteName: "North Software",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Software",
    description: "Construído no Norte. Feito para o mundo.",
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
        {/* React faz o hoist destes links para o <head> */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "North Software",
                url: "https://northsoftware.com.br",
                logo: "https://northsoftware.com.br/logos/NORTH_FULL_LOGO.svg",
                description:
                  "Software house especializada em sistemas sob medida, aplicativos mobile, sites e automação com IA.",
                areaServed: "BR",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "contato@northsoftware.com.br",
                  contactType: "customer support",
                  availableLanguage: "Portuguese",
                },
                sameAs: [
                  "https://www.linkedin.com/company/north-software",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "North Software",
                url: "https://northsoftware.com.br",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://northsoftware.com.br/?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <ScrollRestoration />
        <Navbar />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
