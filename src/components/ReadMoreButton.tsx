import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 200rem;
  border: 3px dashed white;
  padding: 1rem;
`;

const ReadMoreButton = () => {
  return (
    <div>
      <Wrapper className="read-more-button">
        <span className="font-tertiary">READ MORE</span>
      </Wrapper>
    </div>
  );
};

export default ReadMoreButton;
