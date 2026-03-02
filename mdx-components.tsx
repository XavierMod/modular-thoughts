import Link from "@/mdx/Link";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1>
        <span style={{ opacity: 0.5, marginRight: "0.8rem" }}>x</span>
        {children}
      </h1>
    ),
    h3: ({ children }) => (
      <h3>
        <span style={{ opacity: 0.5, marginRight: "0.8rem" }}>/</span>
        {children}
      </h3>
    ),
    a: (props) => <Link href={props.href}>{props.children}</Link>,
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
