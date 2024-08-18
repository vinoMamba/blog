import { getBlogs } from "@/db";
import Link from "next/link";

export default async function Home() {
  const list = await getBlogs()
  return (
    <div>
      {list.map(blog => (
        <div key={blog.id}>
          <Link href={`/blog/${blog.id}`}>
            {blog.properties.Title.title[0].plain_text}
          </Link>
        </div>
      ))}
    </div>
  );
}


