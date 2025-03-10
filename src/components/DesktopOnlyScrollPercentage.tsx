"use client";

import { smallerThan } from "@/utils/mediaQueries";
import React, { useState, useEffect, RefObject } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ isHidden: boolean; scrollPercent: number }>`
  position: fixed;
  bottom: 0;
  right: 0;
  background: rgb(58, 45, 59);
  color: white;
  border-radius: 50%;
  margin: 2rem;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isHidden ? `0` : `1`)};
  transition: all ease 0.3s;
  border: 3px dashed rgba(255, 255, 255, 0.4);

  /* Create a circular border effect that fills up as scrollPercent increases */
  background-image: conic-gradient(
    rgb(91, 64, 94) ${(props) => props.scrollPercent}%,
    transparent 0
  );

  ${smallerThan.mobile`
     display: none;
  `}
`;

const ScrollPercentage = (props: {
  container: RefObject<HTMLDivElement> | RefObject<null>;
}) => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (props.container.current) {
        const scrollTop = props.container.current.scrollTop;
        const docHeight = props.container.current.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollableHeight = docHeight - winHeight;

        if (scrollableHeight <= 0) {
          setScrollPercent(0);
          return;
        }

        const scrolled = (scrollTop / scrollableHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, Math.round(scrolled))));
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.container]);

  return (
    <Wrapper
      isHidden={scrollPercent === 100 ? true : false}
      scrollPercent={scrollPercent}
    >
      <span
        className="font-secondary"
        style={{ fontSize: 25 }}
      >
        {scrollPercent}%
      </span>
    </Wrapper>
  );
};

export default ScrollPercentage;
