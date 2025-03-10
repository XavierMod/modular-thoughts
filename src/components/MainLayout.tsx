"use client";

import Image from "next/image";
import React, { ReactNode, useRef } from "react";
import styled from "styled-components";
import bgImage from "@/images/bg.png";
import NavigationItems from "./NavBar/NavigationItems";
import Archives from "./NavBar/Archives";
import Footer from "./NavBar/Footer";
import Logo from "./NavBar/Logo";
import { YearGroup } from "@/utils/posts";
import { smallerThan } from "@/utils/mediaQueries";
import ContentFooter from "@/components/ContentFooter";
import DesktopOnlyScrollPercentage from "./DesktopOnlyScrollPercentage";
import { usePathname } from "next/navigation";

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  width: 100%;
  left: 0;
  border: 2px dashed rgba(255, 255, 255, 0.2);

  ${smallerThan.mobile`
    position: relative;
    margin: 0;
  `}
`;

const Container = styled.div`
  z-index: 1;
  display: flex;
  height: 100%;
  gap: 2rem;

  ${smallerThan.mobile`
    flex-direction: column;
    gap: 0rem;
  `}
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
  padding: 1rem;

  ${smallerThan.mobile`
    gap: 0.5rem;
  `}
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #181a1c;
  margin-top: 3rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-top-left-radius: 1rem;
  padding: 3rem;
  overflow-y: scroll;
  gap: 2rem;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  ${smallerThan.mobile`
    margin-top: 0;
    border: 0;
    padding: 1rem;

    h1 {
      font-size: 2rem;
      margin-top: 1rem;
    }
  `}
`;

const ArchivesWrapper = styled.div`
  height: 1 1 0px;
  overflow-y: auto;

  ${smallerThan.mobile`
    display: none;
  `}

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

type Props = {
  children: ReactNode;
  posts: YearGroup[];
};

const MainLayout = (props: Props) => {
  const contentRef = useRef(null);
  const pathname = usePathname();
  return (
    <Wrapper>
      <Container>
        <NavBar>
          <div>
            <Logo />
          </div>
          <div>
            <NavigationItems
              totalPosts={
                props.posts.flatMap((yearData: YearGroup) => yearData.posts)
                  .length
              }
            />
          </div>
          <ArchivesWrapper>
            <Archives posts={props.posts} />
          </ArchivesWrapper>
          <div>
            <Footer />
          </div>
        </NavBar>
        <Content ref={contentRef}>
          <div style={{ maxWidth: 850 }}>{props.children}</div>
          {pathname.includes("/post") ? (
            <DesktopOnlyScrollPercentage container={contentRef} />
          ) : null}
          <ContentFooter />
        </Content>
      </Container>
      <Image
        src={bgImage}
        style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}
        layout="fill"
        objectFit="cover"
        alt="Background image"
      />
    </Wrapper>
  );
};

export default MainLayout;
