import React from "react";
import styled from "styled-components";
import { smallerThan } from "@/utils/mediaQueries";

const Wrapper = styled.div`
  opacity: 0.5;
  ${smallerThan.mobile`
    display: none;
  `}
`;

const Footer = () => {
  return <Wrapper className="font-secondary">Xavier Mod. 2025. v1.0</Wrapper>;
};

export default Footer;
