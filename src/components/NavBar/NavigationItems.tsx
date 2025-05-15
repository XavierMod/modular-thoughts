import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  li,
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    opacity: 0.8;
    font-size: 1.1rem;
    line-height: 1.2rem;

    &.active {
      font-weight: bold;
      opacity: 1;
    }
  }
`;

const NavigationItems = (props: { totalPosts: number }) => {
  const pathname = usePathname();
  return (
    <Wrapper>
      <ul>
        <li className={`font-primary ${pathname === "/about" ? "active" : ""}`}>
          <Link href="/about">about</Link>
        </li>
        <li className="font-primary">
          <Link target="_blank" href="https://linktr.ee/xaviermod">
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              contact{" "}
              <FaExternalLinkAlt style={{ fontSize: 15, opacity: 0.7 }} />
            </div>
          </Link>
        </li>
        <li className="font-primary">
          <Link href="https://github.com/XavierMod" target="_blank">
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              github{" "}
              <FaExternalLinkAlt style={{ fontSize: 15, opacity: 0.7 }} />
            </div>
          </Link>
        </li>
        <li className={`font-primary ${pathname === "/" ? "active" : ""}`}>
          <Link href="/">archives [{props.totalPosts}]</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default NavigationItems;
