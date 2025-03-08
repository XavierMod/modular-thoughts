import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import withMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // Add MDX file extensions
};

// Wrap the config with the MDX plugin
export default withMDX({
  extension: /\.mdx?$/, // Recognize .mdx and optionally .md files
  options: {
    remarkPlugins: [remarkGfm], // Add remark plugins here if needed
    rehypePlugins: [rehypeHighlight], // Add rehype plugins here if needed
  },
})(nextConfig);
