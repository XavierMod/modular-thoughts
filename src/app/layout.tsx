import MainLayout from "@/components/MainLayout";
import { getAllPosts } from "@/utils/posts";
import StyledComponentsRegistry from "@/utils/registry";
import "highlight.js/styles/qtcreator-dark.css";
import type { Metadata } from "next";
import { Libre_Baskerville, Bitcount_Grid_Single } from "next/font/google";
import "./globals.css";
import ogImageSquare from "./og-image-square.png";
import ogImage from "./og-image.png";
import HandDrawnLinks from "@/components/HandDrawnLinks";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const bitcountGridSingle = Bitcount_Grid_Single({
  variable: "--font-bitcount-grid-single",
  style: "normal",
  weight: "400",
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
      <body className={`${libreBaskerville.variable} ${bitcountGridSingle.variable}`}>
        <StyledComponentsRegistry>
          <HandDrawnLinks />
          <MainLayout posts={posts}>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
