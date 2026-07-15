import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://erp.agrifrik.com'),
  title: {
    default: 'AGRIFRIK ERP — Gestion Agricole Intelligente',
    template: '%s | AGRIFRIK ERP',
  },
  description: "Système ERP agricole pour Côte d'Ivoire et Afrique de l'Ouest. Gérez cultures, élevage, finances, RH et traçabilité cacao/anacarde.",
  keywords: ['ERP agricole', 'gestion exploitation cacao', 'traçabilité Rainforest Alliance', 'SYSCOHADA', "agriculture Côte d'Ivoire"],
  authors: [{ name: 'AGRIFRIK SAS', url: 'https://agrifrik.com' }],
  creator: 'AGRIFRIK SAS',
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    url: 'https://erp.agrifrik.com',
    siteName: 'AGRIFRIK ERP',
    title: 'AGRIFRIK ERP — Gestion Agricole Intelligente',
    description: "ERP agricole complet pour l'Afrique de l'Ouest",
  },
  robots: { index: false, follow: false },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1B5E20',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E7D32" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AGRIFRIK" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
