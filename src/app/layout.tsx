import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BlogSettings from "./_assets/blog_settings.json";

const glowSansJNormal = localFont({
  src: [
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Book.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./_assets/fonts/GlowSansJ-Normal-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={glowSansJNormal.className}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${BlogSettings.title}`,
    default: BlogSettings.title,
  },
  description: BlogSettings.description,
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon/favicon.svg",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon/favicon-96x96.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "/favicon/favicon.ico",
    },
  ],
};
