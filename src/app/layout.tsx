import type { Metadata } from "next";
import {
  Inter,
  Pixelify_Sans,
  Londrina_Solid,
  Crimson_Pro,
} from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import { getAllPosts } from "@/utils/posts";
import "highlight.js/styles/qtcreator-dark.css";
import StyledComponentsRegistry from "@/utils/registry";
import ogImage from "./og-image.png";
import ogImageSquare from "./og-image-square.png";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina",
  weight: "900",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modular Thoughts",
  description:
    "Modular Thoughts is a blog on software, tech and philosophy written by Xavier Mod",
  metadataBase: new URL("https://www.xaviermod.com"),
  openGraph: {
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
      },
      {
        url: ogImageSquare.src,
        width: 400,
        height: 400,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: ogImage.src,
        width: 1200,
        height: 630,
      },
      {
        url: ogImageSquare.src,
        width: 400,
        height: 400,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${pixelifySans.variable} ${londrinaSolid.variable} ${crimson.variable}`}
      >
        <StyledComponentsRegistry>
          <MainLayout posts={posts}>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
