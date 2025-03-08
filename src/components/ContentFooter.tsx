import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 3px solid #817490;
  padding: 2rem;
  border-radius: 0.5rem;
  background: #423b4a;

  p {
    margin: 0;
  }
`;

const ContentFooter = () => {
  console.log("test");
  return (
    <Wrapper>
      <p>
        All content and posts written by me. Would you like to work together?
        Contact me on Linkedin!
      </p>
    </Wrapper>
  );
};

export default ContentFooter;
