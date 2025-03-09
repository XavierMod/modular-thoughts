"use client";

import ReadMoreButton from "@/components/ReadMoreButton";
import { relativeTime } from "@/utils/lib";
import { PostMeta, YearGroup } from "@/utils/posts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { smallerThan } from "@/utils/mediaQueries";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;

  ${smallerThan.mobile`
    h3 {
      font-size: 2rem;
      line-height: 2rem;
    }
  `}

  &:hover {
    h3 {
      text-decoration: underline;
    }

    .read-more-button {
      background: white;

      span {
        color: black;
      }
    }
  }
`;

const Header = styled.div`
  opacity: 0.7;
  display: flex;
  gap: 1.5rem;

  span {
    display: inline-block;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;

  ${smallerThan.mobile`
    position: relative;
    margin: 0;
    height: 150px;
  `}
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.flatMap((yearData: YearGroup) => yearData.posts));
      });
  }, []);
  return (
    <Wrapper>
      {posts.map((post: PostMeta) => {
        return (
          <Link key={post.slug} href={`post/${post.slug}`}>
            <Post>
              <Header>
                <span className="font-secondary">
                  {relativeTime(post.date)}
                </span>
                <span className="font-secondary">{post.category}</span>
                <span className="font-secondary">
                  {post.length} minute read
                </span>
              </Header>
              <h3>{post.title}</h3>
              <ImageWrapper>
                <Image
                  objectFit="cover"
                  alt="image"
                  layout="fill"
                  src={post.image}
                />
              </ImageWrapper>
              <p>{post.description}</p>
              <ReadMoreButton />
            </Post>
          </Link>
        );
      })}
    </Wrapper>
  );
}
