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
}

export interface YearGroup {
  year: number;
  posts: PostMeta[];
}

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

    return {
      slug: folder,
      date: meta.date as string,
      title: meta.title as string,
      description: meta.description as string,
      category: meta.category as string,
      image: meta.image as string,
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
