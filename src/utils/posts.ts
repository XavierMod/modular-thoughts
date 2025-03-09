import fs from "fs";
import path from "path";

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), "src/app/post");

export interface PostMeta {
  slug: string;
  date: string;
  title: string;
  description: string;
  category: string;
  image: string;
  length: number;
}

export interface YearGroup {
  year: number;
  posts: PostMeta[];
}

// Average reading speed in words per minute
const WORDS_PER_MINUTE = 300;

export function getAllPosts(): YearGroup[] {
  // Get all directories under src/app/post/
  const postFolders = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Collect all posts
  const allPosts: PostMeta[] = postFolders.map((folder) => {
    const filePath = path.join(postsDirectory, folder, "page.mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");

    const metaMatch = fileContents.match(/export const meta = {([\s\S]*?)};/);
    if (!metaMatch) {
      throw new Error(`No meta object found in ${filePath}`);
    }

    const metaString = `{${metaMatch[1]}}`;
    const meta = eval(`(${metaString})`);

    // Calculate reading time
    // Remove the meta portion from the content to count only the actual post body
    const contentWithoutMeta = fileContents.replace(metaMatch[0], "").trim();
    const wordCount = contentWithoutMeta.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

    return {
      slug: folder,
      date: meta.date as string,
      title: meta.title as string,
      description: meta.description as string,
      category: meta.category as string,
      image: meta.image as string,
      length: readingTime, // Add reading time in minutes
      ...meta,
    };
  });

  // Group posts by year
  const postsByYear: Map<number, PostMeta[]> = new Map();
  allPosts.forEach((post) => {
    const year = new Date(post.date).getFullYear();
    if (!postsByYear.has(year)) {
      postsByYear.set(year, []);
    }
    postsByYear.get(year)!.push(post);
  });

  // Convert to array and sort
  const yearGroups: YearGroup[] = Array.from(postsByYear.entries()).map(
    ([year, posts]) => ({
      year,
      posts: posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ), // Sort posts within year
    })
  );

  // Sort years descending (newest first)
  return yearGroups.sort((a, b) => b.year - a.year);
}
