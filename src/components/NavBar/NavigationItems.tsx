import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
        <li
          className={`font-secondary ${pathname === "/about" ? "active" : ""}`}
        >
          <Link href="/about">about</Link>
        </li>
        <li className="font-secondary">
          <Link target="_blank" href="https://linktr.ee/xaviermod">
            contact
          </Link>
        </li>
        <li className="font-secondary">
          <Link href="https://github.com/XavierMod" target="_blank">
            github
          </Link>
        </li>
        <li className={`font-secondary ${pathname === "/" ? "active" : ""}`}>
          <Link href="/">archives [{props.totalPosts}]</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default NavigationItems;
