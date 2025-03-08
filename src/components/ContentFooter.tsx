import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 3px solid #817490;
  padding: 2rem;
  border-radius: 0.5rem;
  background: #423b4a;

  a {
    opacity: 0.7;
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
`;

const ContentFooter = () => {
  console.log("test");
  return (
    <Wrapper>
      <p>
        <strong style={{ fontSize: 17 }} className="font-tertiary">
          MODULAR THOUGHTS
        </strong>{" "}
        is a blog on software, tech and philosophy written by{" "}
        <Link href={"https://github.com/XavierMod"}>Xavier Mod</Link>. See an
        issue? Let me know{" "}
        <Link href={"https://github.com/XavierMod/modular-thoughts/issues/new"}>
          here
        </Link>
        .
      </p>
    </Wrapper>
  );
};

export default ContentFooter;
