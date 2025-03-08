"use client";

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

const Link = (props: { children: React.ReactNode }) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Link;
