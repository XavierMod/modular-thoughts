import React from "react";
import styled from "styled-components";
import { smallerThan } from "@/utils/mediaQueries";

const Wrapper = styled.div`
  opacity: 0.5;
  max-width: 250px;
  ${smallerThan.mobile`
    display: none;
  `}
`;

const Footer = () => {
  return (
    <Wrapper className="font-secondary">
      Modular Thoughts. 2025. v1.0.{" "}
      <a href="https://github.com/XavierMod/modular-thoughts">
        Open-source under MIT license
      </a>
      .
    </Wrapper>
  );
};

export default Footer;
