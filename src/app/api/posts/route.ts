// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/utils/posts";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}
