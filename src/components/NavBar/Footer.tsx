import React from "react";
import styled from "styled-components";
import { smallerThan } from "@/utils/mediaQueries";

const Wrapper = styled.div`
  ${smallerThan.mobile`
    display: none;
  `}
`;

const Footer = () => {
  return <Wrapper>Footer</Wrapper>;
};

export default Footer;
