"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.a`
  opacity: 0.7;
  position: relative;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 1;
  }
`;

const DefaultLink = (props: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={props.href} target="_blank">
      <Wrapper>{props.children}</Wrapper>
    </Link>
  );
};

export default DefaultLink;
