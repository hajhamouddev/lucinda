import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.locale} dir={siteConfig.dir} data-theme="light">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
