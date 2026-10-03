import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "متجر المنصة | Baby.eng Storefront",
  description: "منصة تجارة إلكترونية فائقة السرعة مصممة وفق أرقى معايير تجربة المستخدم والوصولية العالمية.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
