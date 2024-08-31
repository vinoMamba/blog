import { Button } from "@/components/ui/button"
import { getBlogsOrderByDate } from "@/db"
import Link from "next/link"
import dayjs from 'dayjs'
import { Tag } from "lucide-react"
import { Book } from "lucide-react"


export const metadata = {
  title: "Vino| Blog ",
  description: "Generated by create next app",
};


export default async function BlogOrderByDatePage() {
  const list = await getBlogsOrderByDate()

  const genBlogTitle = (titleList) => {
    return titleList.map(t => t.plain_text).join("")
  }
  return (
    <div>
      <div className="flex items-center justify-start">
        <p>我的博客</p>
        <Button variant="ghost" size="sm" className="ml-4">
          <Link href="order_by_tag" className="flex items-center gap-1">
            <Tag className="w-[0.8rem] h-[0.8rem]" />
            按标签
          </Link>
        </Button>
      </div>
      <div className="opacity-60 flex flex-col gap-2 mt-6">
        {
          list.map(item => {
            return (
              <section className=" space-y-2" key={item._id}>
                <h6 className=" font-semibold text-xl leading-7">「{item._id}」</h6>
                <ul className="ml-4">
                  {
                    item.data.map(blog => (
                      <li key={blog.id}>
                        <Link href={`/blog/${blog.id}`} className="flex items-center gap-1 leading-7 group">
                          {blog.icon
                            ? <span>{blog.icon}</span>
                            : <Book className="w-[1rem] h-[1rem]" />}
                          <span className=" group-hover:underline group-hover:underline-offset-2">{genBlogTitle(blog.title)}</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </section>

            )
          })
        }
      </div>
    </div>
  )
}
