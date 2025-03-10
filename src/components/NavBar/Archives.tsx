import { trimText } from "@/utils/lib";
import { PostMeta, YearGroup } from "@/utils/posts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    position: sticky;
    top: 0px;
  }

  ul {
    list-style-type: none;
    padding: auto !important;
    display: flex;
    flex-direction: column;

    li {
      max-width: 250px;
      opacity: 0.5;
      font-size: 1.1rem;
      line-height: 1.5rem;
      margin-left: 1rem;

      &.active {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`;

const Archives = (props: { posts: YearGroup[] }) => {
  const pathname = usePathname();

  return (
    <Wrapper>
      {props.posts.map((yearGroup: YearGroup, index) => {
        return (
          <div key={index}>
            <span className="font-secondary">{yearGroup.year}</span>
            <ul>
              {yearGroup.posts.map((post: PostMeta) => {
                return (
                  <Link
                    key={post.slug}
                    href={`/post/${post.slug}`}
                    style={{ marginBottom: 15 }}
                  >
                    <li
                      className={
                        pathname === `/post/${post.slug}` ? "active" : ""
                      }
                    >
                      {trimText(post.title)}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Archives;
