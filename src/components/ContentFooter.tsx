import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 0.5rem;

  a {
    opacity: 0.7;
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
`;

const ContentFooter = () => {
  return (
    <Wrapper>
      <span
        style={{
          fontSize: "1rem",
          fontFamily: "var(--font-bitcount-grid-single)",
          lineHeight: 2,
        }}
      >
        <div>x</div>
        Modular Thoughts is a blog on software, tech and philosophy written by{" "}
        <Link href={"https://www.linkedin.com/in/xavier-mod/"}>Xavier Mod</Link>.{" "}
        I use AI to improve my writing and bounce off ideas. Words and thoughts are my own.
      </span>
    </Wrapper>
  );
};

export default ContentFooter;
