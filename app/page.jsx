import { getBlogs } from "@/db";
import Link from "next/link";

export default async function Home() {
  const list = await getBlogs()
  return (
    <main>
      {list.map(page => (
        <div key={page.id}>
          <Link href={`blog/${page.id}`}>
            {
                page.properties.Title.title[0].plaintext
            }
          </Link>
          <hr className="py-4" />
        </div>
      ))}
    </main>
  );
}


