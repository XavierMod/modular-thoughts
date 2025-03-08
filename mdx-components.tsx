import Link from "@/mdx/Link";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1>{children}</h1>,
    a: ({ children }) => <Link>{children}</Link>,
    img: (props) => (
      <div
        style={{
          width: "100%",
          height: 300,
          position: "relative",
          margin: "3rem auto",
        }}
      >
        <Image objectFit="cover" alt="image" layout="fill" src={props.src} />
      </div>
    ),
    ...components,
  };
}
